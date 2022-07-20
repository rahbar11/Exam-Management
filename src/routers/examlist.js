const express = require('express');
const {imagePath} = require('../multer/multer');
const fs = require('fs');
const Exam = require('../models/exam');
const Question = require('../models/question');
const Teacher = require('../models/teacher');
const auth = require('../auth/auth');

const router = new express.Router();

router.get("/exams", async (req, res) => {
    const user = await auth(req, res);
    if (user) {
        const exams = await Exam.find();
        res.render("examlist", {user, exams})
    } else {
        res.status(401).redirect("/login")
    }
})

router.get("/exams/del/:id", async(req, res) => {
    const user = await auth(req, res);
    const id = req.params.id
    if (user) {
        const exam = await Exam.findByIdAndDelete(id);
        fs.unlink(imagePath + "/" + exam.image, () => {
            console.log("deleted")
        });
        const qnsToDlt = await Question.find({examid: exam._id});
        qnsToDlt.forEach(async (question, i) => {
            await Teacher.findByIdAndUpdate(question.teacherid, {$inc: {questions: -1}})
        });
        await Question.deleteMany({examid: exam._id});
        await Teacher.findByIdAndUpdate(exam.teacherid, {$inc: {exams: -1}})
        await user.save();
        res.redirect("/exams")
    } else {
        res.status(401).redirect("/login")
    }
})

module.exports = router;