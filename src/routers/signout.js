const express = require('express');
const Teacher = require('../models/teacher');
const auth = require('../auth/auth');

const router = new express.Router();

router.get("/signout", async (req, res) => {
    user = await auth(req, res)
    if (user) {
        const currToken = req.cookies.jwt;
        res.clearCookie('jwt');
        user.tokens = user.tokens.filter((token) => token !== currToken)
        await user.save();
        res.redirect("/login")
    } else {
        res.redirect("/login")
    }
})

router.get("/signoutall", async (req, res) => {
    user = await auth(req, res);
    if (user) {
        const currToken = req.cookies.jwt;
        res.clearCookie('jwt');
        user.tokens = []
        await user.save();
        res.redirect("/login")
    } else {
        res.redirect("/login")
    }
})

module.exports = router;