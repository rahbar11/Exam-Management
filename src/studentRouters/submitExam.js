const express = require('express');
const auth = require('../auth/studentauth');

const router = new express.Router();

router.post("/api/finish", async (req, res) => {
    const user = await auth(req, res);
    if (user) {
        const {examid, questions} = req.body;
        const index = user.examsDone.indexOf(examid);
        user.answers.splice(index, 1, questions);
        await user.updateOne({answers: user.answers});
        res.json("success");
    } else {
        res.status(401).json({error: "unauthorized"})
    }
})

module.exports = router;