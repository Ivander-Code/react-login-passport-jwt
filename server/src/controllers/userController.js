'use strict';
const PASSPORT = require('passport'),
  JWT = require('jsonwebtoken');

let response = {
    message: '',
    redirect: '/signup',
    isAuthenticated: false,
    userDetail: null,
    token: null,
    statusCode: 400,
  },
  userController = {};

let passportAuthenticate = (authenticateName, req, res) => {
  PASSPORT.authenticate(
    authenticateName,
    { session: false },
    async (error, user, info) => {
      let {
        message,
        isAuthenticated,
        userDetail,
        token,
        redirect,
        statusCode,
      } = response;

      if (user !== false) {
        message = 'User logged successfully';
        isAuthenticated = true;
        userDetail = user;
        token = await JWT.sign({ id: user._id }, process.env.sk_jwt, {
          expiresIn: '1m',
        });
        redirect = '/profile';
        statusCode = 200;
      } else {
        message = error !== null ? error.message : info !== undefined ? info.message : '';
        redirect = `/${authenticateName}`;
        statusCode = 401;
      }

      return res
        .status(statusCode)
        .json({ message, isAuthenticated, userDetail, token, redirect });
    }
  )(req, res);
};

userController.signUp = (req, res) => {
  return passportAuthenticate('signup', req, res);
};

userController.signIn = (req, res) => {
  return passportAuthenticate('signin', req, res);
};

userController.resendSession = (req, res) => {
  res.status(req.statusCode).json({
    message: req.message,
    redirect: req.redirect,
    userDetail: req.userDetail,
    isAuthenticated: req.isAuthenticated,
    token: req.token,
  });
};

module.exports = userController;
