'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./user-model');
const auth = require('./middleware');

// POST methods for SignUp and SignIn
authRouter.post('/signup', (req, res, next) => {

  let user = new User(req.body);

  return user.save()
      .then(user => {
        req.token = user.generateToken();
        req.user = user;
        res.set('token', req.token);
        res.cookie('auth', req.token);
        res.send(req.token);
        res.send()
      }).catch(next);
});

authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(`Hello ${req.user.username}`);
});

// methods for turning on/off with specific Lightbulb Id.

// authRouter.get('/light/:id/on', (req, res, next) => {
//   let bulb = req.params.id;
//   light.lightOnOff(bulb, state.on());
//   res.send(`Light ${bulb} Is On`)
// });
//
// authRouter.get('/light/:id/off', (req, res, next) => {
//   let bulb = req.params.id;
//   light.lightOnOff(bulb, state.off());
//   res.send(`Light ${bulb} Is Off`)
// });

// GET methods for search results, bookmarks, notepad, soundcloud

// authRouter.get('/lightgroup/on', (req, res, next) => {
  // light.lightGroup(4, state.on());
  // res.send(`All lights are on`)
// });

// authRouter.get('/lightgroup/off', (req, res, next) => {
  // light.lightGroup(4, state.off());
  // res.send(`All lights are off`)
// });

module.exports = authRouter;
