const mongoose = require('mongoose');


const SubmissionSchema = new mongoose.Schema({
assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
fileUrl: String,
text: String,
submittedAt: { type: Date, default: Date.now },
grade: {
score: Number,
feedback: String,
gradedAt: Date,
gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}
});


module.exports = mongoose.model('Submission', SubmissionSchema);