const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../models/student');

const router = new express.Router();

router.post('/student/signin', async (req, res) => {
    try {
        const {email, password} = req.body;
        const student = await Student.findOne({email});
        isMatch = await bcrypt.compare(password, student.hash);
        if (isMatch) {
            const token = await student.genjwttoken();
            student.save();
            res.status(200).json({token})
        } else {
            res.status(400).json({error: "Invalid Credentials"})
        }
    } catch (error) {
        res.status(400).json({error: "Invalid Credentials"})
    }
})

module.exports = router;