import React  from 'react';
import {Link, Router} from 'react-router-dom';
import history from '../helpers/history';
import {logout} from '../services/authentication.service';

export default function Navbar(){
    return(
        <div className='navbar navbar-light bg-light border mb-5'>
            <div className='navbar-brand'>
                Login Passport JWT
            </div>
            <Router history={history}>
                <div className='d-flex justify-content-end'>
                    <div className='nav-item mr-3'>
                        <Link to={'/profile'} className='text-dark'>Profile</Link>
                    </div>
                    <div className='nav-item mr-3'>
                       <Link to={'/singin'} className='text-dark'>SingIn</Link>
                    </div>
                    <div className='nav-item mr-3'>
                       <Link to={'/singup'} className='text-dark'>SingUp</Link>
                    </div>
                    <div className='nav-item mr-3'>
                        <Link to={'/'} onClick={logout} className='text-dark'>Logout</Link>
                    </div>
                </div>
            </Router>
        </div>
    );
}