/** Action Types */
import {
  SIGN_IN,
  LOG_OUT,
  SIGN_UP,
  VERIFY_SESSION,
  CLEAN_MESSAGE,
} from '../actionTypes/authTypes';
/** Auth Services */
import {
  signin,
  logout,
  verifySession,
  signup,
} from '../services/authentication.service';
/** Signin Action */
export const signInAction = data => {
  return async dispatch => {
    let response = await signin(data);
    dispatch({
      type: SIGN_IN,
      payload: response.data,
    });
  };
};
/** Signup Action */
export const signUpAction = data => {
  return async dispatch => {
    let response = await signup(data);
    dispatch({
      type: SIGN_UP,
      payload: response.data,
    });
  };
};
/** Logout Action */
export const logoutAction = () => {
  logout();
  return {
    type: LOG_OUT,
  };
};
/** Check session Action */
export const verifySessionAction = () => {
  return async dispatch => {
    let response = await verifySession();
    dispatch({
      type: VERIFY_SESSION,
      payload: response.data,
    });
  };
};
/** Clean message Action */
export const cleanMessageAction = () => {
  return {
    type: CLEAN_MESSAGE,
  };
};
