const Course = require('../models/course.js');
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


module.exports = router;