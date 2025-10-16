const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');


// create assignment (teacher only)
router.post('/:courseId', auth, async (req, res) => {
if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Teacher only' });
const course = await Course.findById(req.params.courseId);
if (!course) return res.status(404).json({ message: 'Course not found' });
if (String(course.teacherId) !== String(req.user._id)) return res.status(403).json({ message: 'Not course teacher' });
const { title, description, dueDate } = req.body;
const a = await Assignment.create({ courseId: course._id, title, description, dueDate });
res.status(201).json(a);
});


// list assignments for a course
router.get('/course/:courseId', async (req, res) => {
const list = await Assignment.find({ courseId: req.params.courseId });
res.json(list);
});


module.exports = router;