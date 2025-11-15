const Assignment = require('../models/assignment.js');
const User = require('../models/user.js'); // Fixed: assuming you meant User model
const express = require('express');
const router = express.Router();


// Index of assignments
router.get('/', async (req, res) => {
    try {
        const foundAssignments = await Assignment.find();
        res.status(200).json(foundAssignments);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

// Single assignment shown
router.get('/:assignmentId', async (req, res) => {
    try {
        const foundAssignment = await Assignment.findById(req.params.assignmentId);
        if (!foundAssignment) {
            res.status(404);
            throw new Error('Assignment not found');
        }
        res.status(200).json(foundAssignment);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: 'Something went wrong' });
            console.log(err);
        } else {
            res.status(500).json({ err: 'Something went wrong' });
            console.log(err);
        }
    }
});



module.exports = router;
