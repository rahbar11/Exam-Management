const express = require('express');
const Exam = require('../models/exam');
const Question = require('../models/question');
const Teacher = require('../models/teacher');
const auth = require('../auth/auth');

const router = new express.Router();

router.get("/questions", async (req, res) => {
    const user = await auth(req, res);
    if (user) {
        const exams = await Exam.find();
        const questions = await Question.find();
        res.render("questionlist", {user, exams, questions})
    } else {
        res.status(401).redirect("/login")
    }
})

router.post("/questions", async (req, res) => {
    const user = await auth(req, res);
    const examid = req.body.examid;
    if (user) {
        if (examid === "all") {
            res.redirect("/questions")
        } else {
            const exams = await Exam.find()
            const filteredQuestion = await Question.find({examid});
            res.render("questionlist", {user, exams, questions: filteredQuestion})
        }
    } else {
        res.status(401).redirect("/login")
    }
})

router.get("/questions/del/:id", async(req, res) => {
    const user = await auth(req, res);
    const id = req.params.id
    if (user) {
        const question = await Question.findByIdAndDelete(id);
        await Teacher.findByIdAndUpdate(question.teacherid, {$inc: {questions: -1}})
        await Exam.findByIdAndUpdate(question.examid, {$inc: {questions: -1}})
        res.redirect("/questions")
    } else {
        res.status(401).redirect("/login")
    }
})

module.exports = router;