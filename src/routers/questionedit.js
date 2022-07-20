const express = require('express');
const Exam = require('../models/exam');
const Question = require('../models/question')
const auth = require('../auth/auth');

const router = new express.Router();

router.get("/questions/:id", async (req, res) => {
    const user = await auth(req, res)
    if (user) {
        const exams = await Exam.find();
        const question = await Question.findById(req.params.id);
        res.render("questionedit", {user, exams, question, error: ""})
    } else {
        res.status(401).redirect("/login")
    }
})

router.post("/questions/:id", async (req, res) => {
    const user = await auth(req, res)
    if (user) {
        const optionsSet = new Set(req.body.options);
        if (optionsSet.size === 4) {
            await Question.findByIdAndUpdate(req.params.id, req.body)
            res.redirect("/questions")
        } else {
            const exams = await Exam.find();
            const question = await Question.findById(req.params.id);
            res.render("questionedit", {user, exams, question, error: "Options can't be same!"})
        }
    } else {
        res.status(401).redirect("/login")
    }
})

module.exports = router;