const express = require('express');
const bcrypt = require('bcrypt');
const Teacher = require('../models/teacher');
const auth = require('../auth/auth');

const saltRounds = 10;

const router = new express.Router();

router.get('/register', async (req, res) => {
    if (await auth(req, res)) {
        res.redirect("/")
    } else{
        res.render("register", {error: ""})
    }
})

router.post('/register', async (req, res) => {
    try {
        const {password} = req.body;
        req.body.hash = await bcrypt.hash(password, saltRounds);
        const newTeacher = new Teacher(req.body);
        const token = await newTeacher.genjwttoken();
        await newTeacher.save();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 7*24*60*60*1000),
            httpOnly: true
        })
        res.status(201).redirect("/")
    } catch (error) {
        res.status(400).render("register", {error: "User Already Exists!"})
    }
})

module.exports = router;