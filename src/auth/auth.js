const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacher')

const auth = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const {id} = jwt.verify(token, process.env.SECRET);
        const user = await Teacher.findById(id);
        if (user.tokens.includes(token)) {
            return user
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = auth