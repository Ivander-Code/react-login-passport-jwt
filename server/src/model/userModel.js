'use strict'
const {Schema,model} = require('mongoose');
const BCRIPT = require('bcryptjs');
const userModel = new Schema({
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
},{
    timestamps: true,
    collection: 'user'
});

userModel.methods.validateHash = async(password, userPassword)=>{
    return await BCRIPT.compare(password, userPassword);
};

module.exports = model('user', userModel);
