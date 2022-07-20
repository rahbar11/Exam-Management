const express = require('express');
const auth = require('../auth/auth');

const router = new express.Router();

router.get("/", async (req, res) => {
    const user = await auth(req, res);
    if (user) {
        res.render("index", {user})
    } else {
        res.status(401).redirect("/login")
    }
})

module.exports = router;