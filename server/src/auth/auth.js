'use strict'
const PASSPORT = require('passport'),
    STRATEGY = require('passport-local').Strategy,
    USER_MODEL = require('../model/userModel');

PASSPORT.serializeUser((user, done)=>{
    done(null, user.id);
});

PASSPORT.deserializeUser((id, done)=>{
    const user= USER_MODEL.findById(id);
    done(null,user);
});

//Sing up passport-local
PASSPORT.use('singup', new STRATEGY({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async (req, username, password, done)=>{
    let user;
    try{
        user = await USER_MODEL.findOne({username:username});
    }catch(e){
        return done({message:e.message});
    }

    if(user != null){
        return done(null, false, {message:'The username is already exist'});
    }

    let newUser = new USER_MODEL();
    newUser.username = username;
    newUser.password = password;
    await newUser.save();
    return done(null, newUser);
}));

// Sing in passport local
PASSPORT.use('singin', new STRATEGY({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{
    let user;
    try{
        user = await USER_MODEL.findOne({username:username});
    }catch(error){
        return done({message:error.message});
    }

    if(!user){
        return done(null, false, {message:'Incorrect username'});
    }

    if(await user.validateHash(password, user.password) == false){
        return done(null, false,{message:'Incorrect password'});
    }
    return done(null, user);
}));