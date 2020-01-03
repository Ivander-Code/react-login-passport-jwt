import React from 'react';
import {getSessionItem} from '../services/authentication.service'

export default function Profile(){
    const userDetail = JSON.parse(getSessionItem('userDetail')) ;

    return(
        <div className='text-center'>
            <h1>WELCOME</h1>
            <div className='text-dark'>Username: {
                (userDetail.username)?userDetail.username:''
            }
            </div>
        </div>
    );
}