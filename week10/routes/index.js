var express = require('express');
var router = express.Router();
const passport = require('passport');

// GET home page.
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home page', email: null, auth: false });
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.render('home', { title: 'Home page', email: req.user.email});
});

router.get('/register.html', function(req, res, next) {
  res.render('register', { title: 'Registration page' });
});

router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'Login page' });
});

module.exports = router;
