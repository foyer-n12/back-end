'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./user-model');
const auth = require('./middleware');
const oauth = require('./google');

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

authRouter.post('/login', auth, (req, res, next) => {
  
  res.cookie('auth', req.token);
  res.send(req.token);
  res.send(`Hello ${req.user.username}`);
});


authRouter.get('/oauth', (req,res,next) => {
  oauth(req)
  .then( token => {
    res.status(200).send(token)
  })
  .catch(next);
})

// favorite route
// authRouter.get('/favorites', auth,(req, res, next) => {
//     res.send(`These are your ${req.user}`)
// });

//'{[{name:name,liknk:link},{name:name,liknk:link},{name:name,link:link},{name:name,link:link}]}'
// authRouter.post('/favorites/add', auth, (req, res, next) => {

//   let favorites = new Favorites(req.body);

//   return favorites.save()
//   .then(favorite => {
//     req.token = user.generateToken();
//     req.favorites = favorites;
//     res.send(req.token);
//     res.send()
//   })
//   .catch(next);
    
//   })
  

module.exports = authRouter;
