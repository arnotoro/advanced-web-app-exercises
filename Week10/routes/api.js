var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {body, validationResult} = require('express-validator');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const User = require('../models/Users');
const Todos = require('../models/Todos');

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
router.post('/user/register', 
  body('email').isEmail(),
  body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1 
  }), (req, res, next) => {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body)
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    // check if users exist
    User.findOne({email: email}, (err, user) => {

      if (err) {
        console.log(err);
        return next(err);
      } 

      else if (user) {
        res.status(403).json({email: "Email already exists."});
      } 
      else {
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
  console.log(req.user)
  res.status(200).json({email: req.user.email});
});


// route for todos list
router.post('/todos', passport.authenticate('jwt', {session: false}), (req, res, next) => {

  Todos.findOne({user: req.user._id}, (err, todos) => {
    if (err) {
      console.log(err)
      return next(err);
    } else if (todos) {
      req.body.items.forEach(element => {
        todos.items.push(element)
      });
      todos.save((err, todos) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.status(200).json({success: true, todos: todos});
        }
      })
    } else {
      const newTodos = new Todos({
        user: req.user._id,
        items: []
      });
      req.body.items.forEach(element => {
        newTodos.items.push(element)
      });
        newTodos.save((err, todos) => {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            res.status(200).json({success: true, todos: todos});
        }
      })
    }
  })
})

module.exports = router;
