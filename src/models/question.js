const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    correct: {
        type: Number,
        required: true
    },
    examid: {
        type: String,
        required: true
    },
    teacherid: {
        type: String,
        required: true
    }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question