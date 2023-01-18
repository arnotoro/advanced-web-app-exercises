const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'salainen hauki',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

const initializePassport = require('./passport-config');
initializePassport(passport, getUserByUsername, getUserById);

const users = [];


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/api/user/login', passport.authenticate('local'), (req, res, next) => {
    res.cookie('connect.sid', req.session['connect.sid']);
    res.status(200).send("Login successful!");
    next();
});

app.post('/api/user/register',  (req, res, next) => {
    console.log(req.body);
    if (getUserByUsername(req.body.username) != undefined) {
        res.status(400).send('Username already exists');
        next();
    } else {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const user = {
                id: Date.now().toString(),
                username: req.body.username,
                password: hashedPassword
            }
            users.push(user);

            console.log(users)
            res.send(user);
    }
});

app.get('/api/user/list', (req, res) => {
    res.send(users);
});

function getUserByUsername(username) { 
    user = users.find(user => user.username === username);
    console.log(user);
    return user;
}

function getUserById(id) {
    id = users.find(user => user.id === id);
    console.log(id);
    return id;
}

function checkAuthetication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
}


app.listen(3000)