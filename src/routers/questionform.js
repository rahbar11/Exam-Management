const express = require('express');
const Exam = require('../models/exam');
const Question = require('../models/question')
const auth = require('../auth/auth');

const router = new express.Router();

router.get("/questionform", async (req, res) => {
    const user = await auth(req, res)
    if (user) {
        const exams = await Exam.find()
        res.render("questionform", {user, exams, error: ""})
    } else {
        res.status(401).redirect("/login")
    }
})

router.post("/questionform", async (req, res) => {
    const user = await auth(req, res)
    if (user) {
        const optionsSet = new Set(req.body.options);
        if (optionsSet.size === 4) {
            req.body.teacherid = user._id
            const newQuestion = new Question(req.body)
            user.questions++
            await Exam.findByIdAndUpdate(req.body.examid, {$inc: {questions: 1}})
            await newQuestion.save();
            await user.save();
            res.redirect("/questions")
        } else {
            const exams = await Exam.find()
            res.render("questionform", {user, exams, error: "Options can't be same!"})
        }
    } else {
        res.status(401).redirect("/login")
    }
})

module.exports = router;