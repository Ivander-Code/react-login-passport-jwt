import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {getSessionItem, verifySession} from '../services/authentication.service';

export default function PrivatePage({children, ...props}){
    async function validateSession(){
        await verifySession();
    }
    validateSession();
    return(
        <Route render={()=>
            (getSessionItem('token') !== null && getSessionItem('isAuthenticated') !== false)?(
                children
            ):(
                <Redirect to={{
                    pathname :'/singin',
                    state:{message:''}
                }}
                />
            )
        }>
        </Route>
    );
}
