// seed script to populate database with sample data
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('connected');

  // Clear existing data
  await User.deleteMany({});
  await Course.deleteMany({});
  await Enrollment.deleteMany({});
  await Assignment.deleteMany({});
  await Submission.deleteMany({});

  // Hash passwords
  const tpass = await bcrypt.hash('Teacher123!', 10);
  const spass = await bcrypt.hash('Student123!', 10);

  // Create users
  const teacher1 = await User.create({ name: 'Dr. Alice Johnson', email: 'alice@demo.edu', passwordHash: tpass, role: 'teacher' });
  const teacher2 = await User.create({ name: 'Prof. Bob Smith', email: 'bob@demo.edu', passwordHash: tpass, role: 'teacher' });
  const student1 = await User.create({ name: 'John Doe', email: 'john@demo.edu', passwordHash: spass, role: 'student' });
  const student2 = await User.create({ name: 'Jane Smith', email: 'jane@demo.edu', passwordHash: spass, role: 'student' });
  const student3 = await User.create({ name: 'Mike Wilson', email: 'mike@demo.edu', passwordHash: spass, role: 'student' });

  // Create courses
  const course1 = await Course.create({
    title: 'Introduction to Artificial Intelligence',
    description: 'Learn the fundamentals of AI, machine learning, and neural networks.',
    duration: '12 weeks',
    teacherId: teacher1._id
  });
  const course2 = await Course.create({
    title: 'Web Development Fundamentals',
    description: 'Master HTML, CSS, JavaScript, and modern web frameworks.',
    duration: '8 weeks',
    teacherId: teacher2._id
  });
  const course3 = await Course.create({
    title: 'Data Structures and Algorithms',
    description: 'Essential algorithms and data structures for efficient programming.',
    duration: '10 weeks',
    teacherId: teacher1._id
  });

  // Create enrollments
  await Enrollment.create({ courseId: course1._id, studentId: student1._id });
  await Enrollment.create({ courseId: course1._id, studentId: student2._id });
  await Enrollment.create({ courseId: course2._id, studentId: student1._id });
  await Enrollment.create({ courseId: course2._id, studentId: student3._id });
  await Enrollment.create({ courseId: course3._id, studentId: student2._id });
  await Enrollment.create({ courseId: course3._id, studentId: student3._id });

  // Create assignments
  const assignment1 = await Assignment.create({
    courseId: course1._id,
    title: 'AI Ethics Essay',
    description: 'Write a 1000-word essay on the ethical implications of AI.',
    dueDate: new Date('2024-12-01')
  });
  const assignment2 = await Assignment.create({
    courseId: course1._id,
    title: 'Neural Network Implementation',
    description: 'Implement a simple neural network from scratch.',
    dueDate: new Date('2024-12-15')
  });
  const assignment3 = await Assignment.create({
    courseId: course2._id,
    title: 'Responsive Website Project',
    description: 'Create a responsive website using HTML, CSS, and JavaScript.',
    dueDate: new Date('2024-11-30')
  });
  const assignment4 = await Assignment.create({
    courseId: course3._id,
    title: 'Sorting Algorithms Analysis',
    description: 'Analyze and compare different sorting algorithms.',
    dueDate: new Date('2024-12-10')
  });

  // Create submissions
  await Submission.create({
    assignmentId: assignment1._id,
    studentId: student1._id,
    text: 'This is my essay on AI ethics...',
    submittedAt: new Date('2024-11-25')
  });
  await Submission.create({
    assignmentId: assignment2._id,
    studentId: student2._id,
    fileUrl: 'https://example.com/neural-network-code.zip',
    submittedAt: new Date('2024-12-10')
  });
  await Submission.create({
    assignmentId: assignment3._id,
    studentId: student1._id,
    fileUrl: 'https://example.com/website-project.zip',
    submittedAt: new Date('2024-11-28')
  });
  await Submission.create({
    assignmentId: assignment4._id,
    studentId: student3._id,
    text: 'Analysis of sorting algorithms...',
    submittedAt: new Date('2024-12-05')
  });

  // Add some graded submissions
  await Submission.create({
    assignmentId: assignment1._id,
    studentId: student2._id,
    text: 'Another essay on AI ethics...',
    submittedAt: new Date('2024-11-28'),
    grade: {
      score: 85,
      feedback: 'Good analysis, but could use more examples.',
      gradedAt: new Date('2024-12-02'),
      gradedBy: teacher1._id
    }
  });

  console.log('seed done');
  process.exit();
}
run().catch(e => { console.error(e); process.exit(1) });