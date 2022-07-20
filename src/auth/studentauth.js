const jwt = require('jsonwebtoken');
const Student = require('../models/student')

const auth = async (req, res) => {
    try {
        const token = req.headers.authorization
        const {id} = jwt.verify(token, process.env.SECRET);
        const user = await Student.findById(id);
        if (user.token === token) {
            return user
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = auth