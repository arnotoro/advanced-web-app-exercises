const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

users = [];



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/user/register', (req, res) => {
    res.send('Register');
});

app.post('/api/user/register', (req, res, next) => {
    if (checkForUser(req.body.username)) {
        res.status(400).send('Username already exists');
        next();
    } else {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            user = {
                id: Date.now().toString(),
                username: req.body.username,
                password: hashedPassword
            }
            users.push(user);

            console.log(users)
            res.send(user);
    }
})

app.get('/api/user/list', (req, res) => {
    res.send(users);
})

function checkForUser(username) {
    user = users.find(user => user.username === username);
    if (user != null) {
        return true;
    } else {
        return false;
    }
}


app.listen(3000)