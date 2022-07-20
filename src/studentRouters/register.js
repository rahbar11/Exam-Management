const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../models/student');

const saltRounds = 10;

const router = new express.Router();

router.post("/student/register", async (req, res) => {
    try {
        const {password} = req.body;
            req.body.hash = await bcrypt.hash(password, saltRounds);
            const newStudent = new Student(req.body);
            const token = await newStudent.genjwttoken();
            await newStudent.save();
            res.status(201).json({token})
    } catch (error) {
        res.status(400).json({error: "User already exists"})
    }
})

module.exports = router;