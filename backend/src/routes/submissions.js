const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');


const uploadDir = path.join(__dirname, '..', '..', process.env.UPLOAD_DIR || 'uploads');
const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, uploadDir),
filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


// submit assignment (student)
router.post('/:assignmentId/submit', auth, upload.single('file'), async (req, res) => {
if (req.user.role !== 'student') return res.status(403).json({ message: 'Student only' });
const assignment = await Assignment.findById(req.params.assignmentId);
if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
const submission = await Submission.create({ assignmentId: assignment._id, studentId: req.user._id, fileUrl, text: req.body.text });
res.status(201).json(submission);
});


// teacher: view submissions for an assignment
router.get('/:assignmentId', auth, async (req, res) => {
const assignment = await Assignment.findById(req.params.assignmentId).populate('courseId');
if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
const course = await Course.findById(assignment.courseId);
// ensure teacher
if (String(course.teacherId) !== String(req.user._id)) return res.status(403).json({ message: 'Not course teacher' });
const subs = await Submission.find({ assignmentId: assignment._id }).populate('studentId', 'name email');
res.json(subs);
});


// grade a submission (teacher)
router.post('/:submissionId/grade', auth, async (req, res) => {
if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Teacher only' });
const { score, feedback } = req.body;
const sub = await Submission.findById(req.params.submissionId).populate('assignmentId');
if (!sub) return res.status(404).json({ message: 'Submission not found' });
const course = await Course.findById(sub.assignmentId.courseId);
if (String(course.teacherId) !== String(req.user._id)) return res.status(403).json({ message: 'Not course teacher' });
sub.grade = { score, feedback, gradedAt: new Date(), gradedBy: req.user._id };
await sub.save();
res.json(sub);
});


// student: view own submissions
router.get('/me', auth, async (req, res) => {
const subs = await Submission.find({ studentId: req.user._id }).populate('assignmentId');
res.json(subs);
});


module.exports = router;