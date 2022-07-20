const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    examsDone: [],
    answers: [],
    hash: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: ""
    }
});

studentSchema.methods.genjwttoken = async function() {
    token = await jwt.sign({id: this._id}, process.env.SECRET, {
        expiresIn: "2h"
    })
    this.token = token;
    return token
}

const Student = mongoose.model("Student", studentSchema);

module.exports = Student