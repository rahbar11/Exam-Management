const express = require('express');
const bcrypt = require('bcrypt');
const Teacher = require('../models/teacher');
const auth = require('../auth/auth')

const router = new express.Router();

router.get('/login', async (req, res) => {
    if (await auth(req, res)) {
        res.redirect("/")
    } else{
        res.render("login", {error: ""});
    }
})

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const teacher = await Teacher.findOne({username});
        isMatch = await bcrypt.compare(password, teacher.hash);
        if (isMatch) {
            const token = await teacher.genjwttoken();
            teacher.save();
            let options = {httpOnly:true}
            if (req.body.remember) {
                options = {
                    expires: new Date(Date.now() + 7*24*60*60*1000),
                    ...options
                }
            }
            res.cookie("jwt", token, options)
            res.redirect("/")
            
        } else {
            res.status(400).render("login", {error: "Invalid Credentials"})
        }
    } catch (error) {
        res.status(400).render("login", {error: "Invalid Credentials"})
    }
})

module.exports = router;