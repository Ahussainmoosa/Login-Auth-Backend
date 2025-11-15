const Course = require('../models/course.js');
const isSignedIn = require("../middleware/is-signed-in.js");
const adminPerm = require("../middleware/is-admin.js");
const express = require('express');
const router = express.Router();

//index of courses
router.get('/', async (req, res) => {
    try {
        const foundCourses = await Course.find();
        res.status(200).json(foundCourses);

    } catch (err) {
        console.log(err);
        res.status(500).json({err: "Something went wrong"})

    }
}); 

//create new course
router.post('/new', isSignedIn, adminPerm, async(req, res) => {
    try{
        const createdCourse = await Course.create(req.body);
        res.status(201).json(createdCourse);

    } catch (err){
        console.log(err);
        res.status(500).json({err: 'Something went wrong'})
    }
});

//single course shown
router.get('/:courseId', async (req, res) => {
    try{
        const foundCourse = await Course.findById(req.params.courseId); 
        if(!foundCourse){
            res.status(404);
            throw new Error('Course not found');
        }

        res.status(200).json(foundCourse);

    } catch (err) {
        if (res.statusCode === 404){
            res.json({err: "Something went wrong"});
            console.log(err);
        } else {
            res.status(500).json({err: 'Something went wrong'});
            console.log(err);
        }
    }
});


//edit form
router.get('/:courseId/edit', isSignedIn, adminPerm, async(req, res) => {
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
router.put('/:courseId', isSignedIn, adminPerm, async (req, res) => {
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
router.delete('/:courseId', isSignedIn, adminPerm, async (req, res) => {
    try{
        const course = await Course.findByIdAndDelete(req.params.courseId);
        if (!course){
            res.status(404);
            throw new Error('Course not found');
        }
        res.status(204).json;
    } catch (err){
        console.log(err);
        res.status(500).json({err:'Something went wrong'})
    }
    

});

module.exports = router;