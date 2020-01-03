'use strict'
const PASSPORT = require('passport');
const STRATEGY = require('passport-local').Strategy;
const USERMODEL = require('../model/userModel');


PASSPORT.serializeUser((user, done)=>{
    done(null, user.id);
});

PASSPORT.deserializeUser((id, done)=>{
    const user= USERMODEL.findById(id);
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
        user = await USERMODEL.findOne({username:username});
    }catch(e){
        return done({message:e.message});
    }

    if(user != null){
        return done(null, false, {message:'The username is already exist'});
    }

    let newUser = new USERMODEL();
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
        user = await USERMODEL.findOne({username:username});
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