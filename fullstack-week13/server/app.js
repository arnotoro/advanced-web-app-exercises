var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// connect to mongodb
const mongoDB = 'mongodb://127.0.0.1:27017/books';
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// cors
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve("..", "client", "build")));
    app.get("*", (req, res) => 
        res.sendFile(path.resolve("..", "client", "build", "index.html"))
    );
} else if (process.env.NODE_ENV === 'development') {
    var corsOpstions = {
        origin: 'http://localhost:3000',
        optionSuccessStatus: 200,
    }
    app.use(cors(corsOpstions));
}

module.exports = app;
