const mongoose = require('mongoose');


const AssignmentSchema = new mongoose.Schema({
courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
title: String,
description: String,
dueDate: Date,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Assignment', AssignmentSchema);