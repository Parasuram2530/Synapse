const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
title: String,
description: String,
duration: String,
teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Course', CourseSchema);