const Assignment = require('../models/assignment.js');
const isSignedIn = require("../middleware/is-signed-in.js");
const adminPerm = require("../middleware/is-admin.js");
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

// Create new assignment
router.post('/new', isSignedIn, adminPerm, async (req, res) => {
    try {
        const createdAssignment = await Assignment.create(req.body);
        res.status(201).json(createdAssignment);
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

// Edit form
router.get('/:assignmentId/edit', isSignedIn, adminPerm, async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.assignmentId);
        if (!assignment) {
            res.status(404);
            throw new Error('Assignment not found');
        }
        res.status(200).json(assignment);

    } catch (err) {
        res.status(500).json({ err: 'Something went wrong' });
        console.log(err);
    }
});

// Submit form
router.post('/', isSignedIn, adminPerm, async (req, res) => {
    try {
        const createdAssignment = await Assignment.create(req.body);
        res.status(201).json(createdAssignment);
    } catch (err) {
        res.status(500).json({ err: 'Something went wrong' });
        console.log(err);
    }
});

// Update
router.put('/:assignmentId',isSignedIn, adminPerm, async (req, res) => {
    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            req.params.assignmentId,
            req.body,
            { new: true }
        );
        if (!updatedAssignment) {
            res.status(404);
            throw new Error('Assignment not found');
        }
        res.status(200).json(updatedAssignment);
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

// Delete
router.delete('/:assignmentId', isSignedIn, adminPerm, async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.assignmentId);
        if (!assignment) {
            res.status(404);
            throw new Error('Assignment not found');
        }
        res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});


module.exports = router;
