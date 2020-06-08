/** Dependencies */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Action */
import { verifySessionAction } from '../actions/auth.action';

/** Component */
export default function PrivatePage({ children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.session.isAuthenticated);

  dispatch(verifySessionAction());
  return (
    <Route
      render={() =>
        isAuthenticated !== null && isAuthenticated !== false ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
            }}
          />
        )
      }></Route>
  );
}
