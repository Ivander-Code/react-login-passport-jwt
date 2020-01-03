//import React from 'react';

export function validForm(fields){
    let result = {
        isValidForm: true,
        message: ''
    };
    let regExpEmail = new RegExp('/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/');
    for( let key in fields){
        if(key === 'username' || key === 'email'){
            if(regExpEmail.test(fields[key])){
                continue;
            }else{
                result.isValidForm = false;
                result.message = 'Incorrect email format'
                break;
            }
        }else if(key === 'password'){
            if(fields[key].length === 0){
                result.isValidForm = false;
                result.message = 'The field password is required';
                break;
            }else{
                continue;
            }
        }
    }
    return result;
}