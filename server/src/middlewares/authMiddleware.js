'use strict';
const JWT = require('jsonwebtoken'),
  USER_MODEL = require('../model/userModel'),
  PASSPORT = require('passport');
let response = {
  message: '',
  redirect: '/signup',
  isAuthenticated: false,
  userDetail: null,
  token: null,
  statusCode: 400,
};

let authVerify = (req, res, next) => {
  const accessToken = req.headers.authorization;
  let message, token, isAuthenticated, userDetail, redirect, statusCode;
  let secretKey = process.env.sk_jwt;
  let verify = JWT.verify(accessToken, secretKey, async (error, decode) => {
    if (error !== null) {
      message = error.message;
      isAuthenticated = false;
      token = null;
      userDetail = null;
      statusCode = 401;
      redirect = '/';
      res.status(statusCode).json({
        message,
        userDetail,
        isAuthenticated,
        token,
        redirect,
      });
    }
    if (decode !== undefined) {
      req.userDetail = await USER_MODEL.findById(decode.id);
      req.message = '';
      req.token = accessToken;
      req.isAuthenticated = true;
      req.statusCode = 200;
      req.redirect = '/profile';
      next();
    }
  });
};

module.exports = authVerify;
