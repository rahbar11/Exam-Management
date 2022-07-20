const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    questions: {
        type: Number,
        default: 0
    },
    teacherid: {
        type: String,
        required: true
    }
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam