var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('../auth/passport')(passport);

// login route
router.post('/user/login', (req, res, next) => {
  const {email, password} = req.body;

  // check if user exists
  User.findOne({email: email}, (err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    else if (!user) {
      res.status(403).json({email: "Email does not exist."});
    } else {
      // compare password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else if (result) {
          // create token
          const token = jwt.sign({email: user.email}, process.env.SECRET, {expiresIn: 60 * 60});
          res.status(200).json({success: true, token: token});
        } else {
          res.status(403).json({password: "Password is incorrect."});
        }
      })
    }
  })
});
// register route
router.post('/user/register', (req, res, next) => {
  const {email, password} = req.body;

  // check if users exist
  User.findOne({email: email}, (err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    } 
    else if (user) {
      res.status(403).json({email: "Email already exists."});
    } else {
      // hash password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            // create new user
            const newUser = new User({
              email: email,
              password: hash
            });
            newUser.save((err, user) => {
              if (err) {
                console.log(err);
                return next(err);
              } else {
                res.status(200).json({success: true});
              }
            })
          }
        })
      })
    }
  })
});
 

// secret route to test authentication
router.get('/private', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.status(200).send("You are authenticated!");
});



module.exports = router;
