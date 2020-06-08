'use strict';
const { Router } = require('express'),
  ROUTER = Router(),
  AUTH_VERIFY = require('../middlewares/authMiddleware'),
  { signIn, signUp, resendSession } = require('../controllers/userController');

ROUTER.post('/api/auth/signup', signUp);

ROUTER.post('/api/auth/signin', signIn);

ROUTER.post('/api/auth/verifySession', AUTH_VERIFY, resendSession);

module.exports = ROUTER;
