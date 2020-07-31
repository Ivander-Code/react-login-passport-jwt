/**Dependencies */
import React from 'react';
import { Link, Router } from 'react-router-dom';
import { Navbar as NavBar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

/** Helper Browser History */
import history from '../helpers/history';

/** Services Auth */
import { logoutAction, cleanMessageAction } from '../actions/auth.action';

/** Component */
export default function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.session.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const handleCleanMessage = () => {
    dispatch(cleanMessageAction());
  };
  return (
    <NavBar className='navbar-light bg-light border mb-5'>
      <NavBar.Brand>Login Passport JWT</NavBar.Brand>
      <Router history={history}>
        <Nav className='d-flex justify-content-end w-100'>
          {!isAuthenticated && (
            <>
              <Nav.Item className='mr-3'>
                <Link to={'/signin'} onClick={handleCleanMessage} className='text-dark'>
                  Sign in
                </Link>
              </Nav.Item>
              <Nav.Item className='mr-3'>
                <Link to={'/signup'} onClick={handleCleanMessage} className='text-dark'>
                  Sign up
                </Link>
              </Nav.Item>
            </>
          )}
          {isAuthenticated && (
            <>
              <Nav.Item className='mr-3'>
                <Link to={'/profile'} className='text-dark'>
                  Profile
                </Link>
              </Nav.Item>
              <Nav.Item className='mr-3'>
                <Link to={'/'} onClick={handleLogout} className='text-dark'>
                  Logout
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Router>
    </NavBar>
  );
}
