const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport-config');
initializePassport(passport, getUserByUsername, getUserById);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'salainen hauki',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

const users = [];
const todosList = [];

app.post('/', (req, res) => {
    res.status(200).send('Logged in POST!');
});

app.get('/', (req, res) => {
    res.status(200).send('Logged in GET!');
});


app.post('/api/user/login', checkAuthenticated, passport.authenticate('local'), (req, res, next) => {
        res.cookie('connect.sid', req.session['connect.sid']);
        res.status(200).send("Login successful!");
        next();
});

app.post('/api/user/register', checkAuthenticated, (req, res, next) => {   
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

app.get('/api/secret', (req, res) => {
    if(req.isAuthenticated()) {
        res.status(200).send('Secret page, user authenticated!');
    } else {
        res.status(401).send('You are not logged in');
    }
});

app.post('/api/todos', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.session.todoUser == undefined) {
            req.session.todoUser = {
                id: req.user.id,
                todos: []
            };
            req.session.todoUser.todos.push(req.body.todo);
            todosList.push(req.session.todoUser);
            console.log(todosList);
            res.status(200).send(req.session.todoUser);
        } else {
            userIndex = todosList.findIndex(user => user.id === req.user.id);
            todosList[userIndex].todos.push(req.body.todo);
            console.log(todosList);
            res.status(200).send(todosList[userIndex]);
        }
    } else {
        res.status(401).send('You are not logged in');
    }
});

app.get('/api/todos/list', (req, res) => {
    res.send(todosList);
});

function getUserByUsername(username) { 
    return users.find(user => user.username === username);
}

function getUserById(id) {
    return users.find(user => user.id === id);
}

// redirect to home if user is already logged in
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
}

app.listen(3000)