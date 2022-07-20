const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    tokens: {
        type: Array,
        default: []
    },
    exams: {
        type: Number,
        default: 0
    },
    questions: {
        type: Number,
        default: 0
    }
});

teacherSchema.methods.genjwttoken = async function() {
    token = await jwt.sign({id: this._id}, process.env.SECRET, {
        expiresIn: "7 days"
    })
    this.tokens.push(token);
    return token
}

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher