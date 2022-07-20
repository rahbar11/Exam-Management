const mongoose = require('mongoose');

const db_uri = process.env.MONGODB_URI

mongoose.connect(db_uri, () => {
    console.log("db connected")
});