
const multer  = require('multer');
const path = require('path');

const imagePath = path.join(__dirname, "../../public/Exam Images")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imagePath)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname)) //Appending extension
    }
  })
  
const upload = multer({ storage: storage });

module.exports = {upload, imagePath}