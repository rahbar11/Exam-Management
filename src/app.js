const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./db/conn');
const cors = require('cors');

const indexRouter = require('./routers/index');
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const signOutRouter = require('./routers/signout');
const examFormRouter = require('./routers/examform');
const examListRouter = require('./routers/examlist');
const examEditRouter = require('./routers/examedit');
const questionFormRouter = require('./routers/questionform');
const questionListRouter = require('./routers/questionlist');
const questionEditRouter = require('./routers/questionedit');


const stRegisterRouter = require('./studentRouters/register')
const stSignInRouter = require('./studentRouters/signin')
const examsRouter = require('./studentRouters/exams')
const questionsRouter = require('./studentRouters/questions')
const submitRouter = require('./studentRouters/submitExam')
const resultRouter = require('./studentRouters/result')

const PORT = process.env.PORT || 3000
const static_path = path.join(__dirname, "../public")
const views_path = path.join(__dirname, "../templates/views");

const app = express();

app.use(express.static(static_path));
app.set("view engine", "ejs");
app.set("views", views_path);
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cookieParser());
app.use(cors())

app.use(indexRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(signOutRouter);
app.use(examFormRouter);
app.use(examListRouter);
app.use(examEditRouter);
app.use(questionFormRouter);
app.use(questionListRouter);
app.use(questionEditRouter);


app.use(stRegisterRouter);
app.use(stSignInRouter);
app.use(examsRouter);
app.use(questionsRouter);
app.use(submitRouter);
app.use(resultRouter);


app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})