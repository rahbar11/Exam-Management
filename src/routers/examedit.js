const express = require('express');
const {upload, imagePath} = require('../multer/multer');
const fs = require('fs');
const Exam = require('../models/exam');
const auth = require('../auth/auth');

const router = new express.Router();

router.get("/exams/:id", async (req, res) => {
    const user = await auth(req, res);
    const id = req.params.id
    if (user) {
        const exam = await Exam.findById(id);
        res.render("examedit", {user, examname: exam.name, error: ""})
    } else {
        res.status(401).redirect("/login")
    }
})

router.post("/exams/:id", upload.single('examimage'), async (req, res, next) => {
    const user = await auth(req, res)
    const id = req.params.id
    if (user) {
        let data = {};
        if (req.body.examname) {
            data.name = req.body.examname
        }
        if (req.file) {
            data.image = req.file.filename
        }
        try {
            const exam = await Exam.findByIdAndUpdate(id, data);
            if (req.file) {
                fs.unlink(imagePath + "/" + exam.image, () => {
                    console.log("image updated")
                });
            }
            res.redirect("/exams")
        } catch (error) {
            const exam = await Exam.findById(id);
            res.status(400).render("examedit", {user, examname: exam.name, error: "Exam Already Exists"})
        }
    } else {
        res.status(401).redirect("/login")
    }
})

module.exports = router;