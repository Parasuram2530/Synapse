const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');


// list courses
router.get('/', async (req, res) => {
const courses = await Course.find().populate('teacherId', 'name email');
res.json(courses);
});


// create course (teacher only)
router.post('/', auth, async (req, res) => {
if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Teacher only' });
const { title, description, duration } = req.body;
const course = await Course.create({ title, description, duration, teacherId: req.user._id });
res.status(201).json(course);
});


// course detail
router.get('/:id', async (req, res) => {
const course = await Course.findById(req.params.id).populate('teacherId', 'name email');
if (!course) return res.status(404).json({ message: 'Not found' });
const enrolledCount = await Enrollment.countDocuments({ courseId: course._id });
res.json({ course, enrolledCount });
});


// enroll (student only)
router.post('/:id/enroll', auth, async (req, res) => {
if (req.user.role !== 'student') return res.status(403).json({ message: 'Student only' });
const already = await Enrollment.findOne({ courseId: req.params.id, studentId: req.user._id });
if (already) return res.json({ message: 'Already enrolled' });
const enrollment = await Enrollment.create({ courseId: req.params.id, studentId: req.user._id });
res.json({ message: 'enrolled', enrollment });
});


// list students in course (teacher only)
router.get('/:id/students', auth, async (req, res) => {
const course = await Course.findById(req.params.id);
if (!course) return res.status(404).json({ message: 'Not found' });
if (String(course.teacherId) !== String(req.user._id)) return res.status(403).json({ message: 'Not course teacher' });
const enrollments = await Enrollment.find({ courseId: req.params.id }).populate('studentId', 'name email');
res.json(enrollments.map(e => e.studentId));
});


module.exports = router;