'use strict'
const {Schema,model} = require('mongoose'),
    BCRIPT           = require('bcryptjs'),
    USER_MODEL       = new Schema({
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

USER_MODEL.methods.validateHash = async(password, userPassword)=>{
    return await BCRIPT.compare(password, userPassword);
};

module.exports = model('user', USER_MODEL);
