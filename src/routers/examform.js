const express = require('express');
const {upload, imagePath} = require('../multer/multer');
const fs = require('fs');
const Exam = require('../models/exam');
const auth = require('../auth/auth');

const router = new express.Router();

router.get("/examform", async (req, res) => {
    const user = await auth(req, res)
    if (user) {
        res.render("examform", {user, error: ""})
    } else {
        res.status(401).redirect("/login")
    }
})

router.post("/examform", upload.single('examimage'), async (req, res, next) => {
    const user = await auth(req, res)
    if (user) {
        const {filename} = req.file;
        const {examname} = req.body;
        const newExam = new Exam({
            name: examname,
            image: filename,
            teacherid: user._id
        })
        user.exams++
        try {
            await newExam.save();
            await user.save();
            res.redirect("/exams")
        } catch (error) {
            fs.unlink(imagePath + "/" + newExam.image, () => {
                console.log("deleted")
            });
            res.status(400).render("examform", {user, error: "Exam Already Exists!"})
        }
    } else {
        res.status(401).redirect("/login")
    }
})

module.exports = router;