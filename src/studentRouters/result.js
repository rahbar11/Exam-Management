const express = require('express');
const Question = require('../models/question')
const auth = require('../auth/studentauth');

const router = new express.Router();

router.post("/api/result", async (req, res) => {
    const user = await auth(req, res);
    if (user) {
        const {examid, questions} = req.body;
        if (user.examsDone.includes(examid)) {
            const promises = questions.map(async (question, index) => {
                const ques = await Question.findById(question._id);
                question.correct = ques.correct;
                return question
            })
            const resolvedPromises = await Promise.allSettled(promises);
            const updatedQuestions = resolvedPromises.map((promise) => promise.value)
            res.json(updatedQuestions);
        } else {
            res.status(401).json({error: "unauthorized"})
        }
    } else {
        res.status(401).json({error: "unauthorized"})
    }
})

module.exports = router;