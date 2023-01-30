var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/user/login', (req, res, next) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    } 
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (result) {
          const jwtPayload = {
            id: user._id,
            email: user.email
          }
          jwt.sign(jwtPayload, process.env.SECRET, {expiresIn: 120}, (err, token) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            res.status(200).json({success: true, token: token});
          }
          )} else {
            res.status(403).json({password: "Incorrect password."});
          }
      })
    }
  })
});

router.post('/user/register', (req, res, next) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    };
    if (!user) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            return next(err);
          };
          User.create({
            email: req.body.email,
            password: hash
          }, (err, ok) => {
            if (err) {
              console.log(err);
              return next(err);
            };
            res.status(200).send("User created!");
          });
        });
      })} else {
        res.status(403).json({email: "Email already in use."});
      }});
  });
module.exports = router;
