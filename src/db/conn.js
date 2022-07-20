const mongoose = require('mongoose');

const db_uri = 'mongodb://localhost:27017'
const db = 'Exam-Manage'

mongoose.connect(db_uri + '/' + db, () => {
    console.log("db connected")
});