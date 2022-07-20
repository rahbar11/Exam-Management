const express = require('express');
const Exam = require('../models/exam');
const Question = require('../models/question')
const auth = require('../auth/studentauth');

const router = new express.Router();

router.post("/api/questions", async (req, res) => {
    const user = await auth(req, res);
    if (user) {
        const {examid} = req.body
        const questions = await Question.find({examid}, {teacherid:0, correct:0});
        user.examsDone.push(examid);
        await user.save();
        res.json(questions)
    } else {
        res.status(401).json({error: "unauthorized"})
    }
})

module.exports = router;