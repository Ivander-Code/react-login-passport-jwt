'use strict'
const JWT = require('jsonwebtoken');
const USER_MODEL = require('../model/userModel');
const PASSPORT = require('passport');
let response   = { message:'',redirect:'/singup',isAuthenticated:false, userDetail:null, token:null , statusCode:400};

let authVerify = (req, res, next)=>{
    const accessToken = req.headers.authorization;
    let message, token, isAuthenticated, user;
    let secretKey = process.env.sk_jwt;
    let verify = JWT.verify(accessToken, secretKey, async(error, decode)=>{
        if(error !== null){
            req.message    = error.message;
            req.isLogged   = false;
            req.token      = null;
            req.userDetail = null;
            req.statusCode = 401;
            res.status(req.statusCode).json({message, redirect:req.redirect, userDetail:req.userDetail,
                isAuthenticated: req.isLogged, token:req.token});
        }
        if(decode !== undefined){
            req.userDetail = await USER_MODEL.findById(decode.id);
            req.message    ='';
            req.token      = accessToken;
            req.isLogged   = true;
            req.statusCode = 200;
            next();
        }
    });
};

module.exports = authVerify;