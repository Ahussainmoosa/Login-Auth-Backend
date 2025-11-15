const express = require("express");
const router = express.Router();
const isSignedIn = require("../middleware/is-signed-in.js");
const adminPerm = require("../middleware/is-admin.js");

//all below routes require admin privilege
router.use(adminPerm);
router.use(isSignedIn);

//create new course
router.post('/new', async(req, res) => {
    try{
        const createdCourse = await Course.create(req.body);
        res.status(201).json(createdCourse);

    } catch (err){
        console.log(err);
        res.status(500).json({err: 'Something went wrong'})
    }
});

//edit form
router.get('/:courseId/edit', async(req, res) => {
    try{
        const course = await Course.findById(req.params.courseId);
        if (!course){
            res.status(404);
            throw new Error('Course not found');
        }
        res.status(200).json(course);
    } catch (err){
        res.status(500).json({err: 'Something went wrong'});
        console.log(err);
    }
});

//update
router.put('/:courseId', async (req, res) => {
    try{
        const updatedCourse = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
            new: true,
        });
        if (!updatedCourse){
            res.status(404);
            throw new Error('Course not found');
        }
        res.status(200).json(updatedCourse);

    } catch (err){
        if(res.statusCode === 404){
            res.json({err:'Something went wrong'})
            console.log(err);
        } else {
            res.status(500).json({err:'Something went wrong'})
            console.log(err);
        }
    }
});

//delete
router.delete('/:courseId', async (req, res) => {
    try{
        const course = await Course.findByIdAndDelete(req.params.courseId);
        if (!course){
            res.status(404);
            throw new Error('Course not found');
        }
        res.status(204);
    } catch (err){
        console.log(err);
        res.status(500).json({err:'Something went wrong'})
    }
    

});



module.exports = router;
