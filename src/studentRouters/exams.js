const express = require('express');
const Exam = require('../models/exam');
const auth = require('../auth/studentauth');

const router = new express.Router();

router.post("/api/exams", async (req, res) => {
    const user = await auth(req, res);
    if (user) {
        const {examsDone} = user
        const exams = await Exam.find({}, {teacherid:0})
        res.json({exams, examsDone})
    } else {
        res.status(401).json({error: "unauthorized"})
    }
})

module.exports = router;