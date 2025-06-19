const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['javascript', 'python', 'java', 'cpp', 'c', 'bash', 'ruby', 'go', 'rust','typescript'],
        required: true
    },
    runtime: {
        type: Number,
        default: 0
    },
    memory: {
        type: Number,
        default: 0
    },
    errorMessage: {
        type: String,
        default: ''
    },
    testCasesPassed:{
        type: Number,
        default: 0
    },
    testCasesTotal: {
        type: Number,
        default: 0
    },
    
}, {
    timestamps: true
});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;