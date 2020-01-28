'use strict'
const {Router}  = require('express'),
    ROUTER      = Router(),
    AUTH_VERIFY = require('../middlewares/authMiddleware'),
    USER_CONTROLLER = require('../controllers/userController');

ROUTER.post('/api/auth/singup',USER_CONTROLLER.singUp);

ROUTER.post('/api/auth/singin', USER_CONTROLLER.singIn);

ROUTER.post('/api/auth/verifySession',AUTH_VERIFY,USER_CONTROLLER.resendSession);

module.exports = ROUTER;

