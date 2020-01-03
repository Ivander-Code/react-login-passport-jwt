'use strict'
const {Router} = require('express');
const PASSPORT = require('passport');
const ROUTER   = Router();
const JWT      = require('jsonwebtoken');
const authVerify = require('../middlewares/authMiddleware');
let response   = { message:'',redirect:'/singup',isAuthenticated:false, userDetail:null, token:null , statusCode:400};

let passportAuthenticate = (authenticateName, req, res)=>{
    PASSPORT.authenticate(authenticateName,{session: false},async(error , user, info)=>{
        let {message, isAuthenticated, userDetail, token, redirect, statusCode} = response;

        if(user !== false){
            message = 'User created successfully';
            isAuthenticated = true;
            userDetail = user;
            token = await JWT.sign({id: user._id},process.env.sk_jwt,{expiresIn: '1m'});
            redirect = '/profile';
            statusCode = 200;
        }else{
            message = (error!== null)? error.message: (info !== undefined)?info.message:'';
            redirect = `/${authenticateName}`;
            statusCode = 401;
        }

        return res.status(statusCode).json({message,isAuthenticated ,userDetail, token,redirect});
    })(req, res);
};

ROUTER.post('/api/auth/singup',(req, res)=>{
    return passportAuthenticate('singup', req, res);
});

ROUTER.post('/api/auth/singin', (req, res)=>{
    return passportAuthenticate('singin', req, res);
});

ROUTER.post('/api/auth/verifySession',authVerify,(req, res)=>{
    let {message, redirect, userDetail, isAuthenticated, token} = response;
    message         = req.message;
    redirect        = req.redirect;
    userDetail      = req.userDetail;
    isAuthenticated = req.isLogged;
    token           = req.token;

    res.status(req.statusCode).json({message, redirect, userDetail,isAuthenticated, token});
});

module.exports = ROUTER;

