/** Helper */
import axiosConnect from '../helpers/axiosConnect';
/** Core Auth Service */
const authService = async (data, route) => {
  const connection = axiosConnect.getConnection;
  let response = {};
  try {
    response = await connection.post(route, data);
  } catch (error) {
    response = error.response;
  }
  createSession(
    response.data.token,
    response.data.isAuthenticated,
    response.data.userDetail,
    response.data.redirect,
    response.data.message
  );
  return response;
};
/** Service Signin */
export let signup = async data => {
  return await authService(data, '/api/auth/signup');
};
/** Service Signup */
export let signin = async data => {
  return await authService(data, '/api/auth/signin');
};

const createSession = (...[token, isAuthenticated, userDetail, redirect, message]) => {
  destroySession();
  localStorage.setItem('token', token);
  localStorage.setItem('isAuthenticated', isAuthenticated);
  localStorage.setItem('userDetail', JSON.stringify(userDetail));
  localStorage.setItem('redirect', redirect);
  localStorage.setItem('message', message);
};

const destroySession = () => {
  localStorage.setItem('token', null);
  localStorage.setItem('isAuthenticated', false);
  localStorage.setItem('userDetail', {});
  localStorage.setItem('redirect', '/');
  localStorage.setItem('message', '');
};

export const logout = () => {
  destroySession();
};
/** Service Check session */
export const verifySession = async () => {
  let token = getSessionItem('token');
  let response = {};

  if (token) {
    axiosConnect.setConfig = {
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    let connection = axiosConnect.getConnection;
    try {
      response = await connection.post('/api/auth/verifySession');
    } catch (error) {
      response = error.response;
    }

    response.status == 200
      ? createSession(
          response.data.token,
          response.data.isAuthenticated,
          response.data.userDetail,
          response.data.redirect,
          response.data.message
        )
      : destroySession();
  } else {
    destroySession();
    response.data = {
      token: null,
      isAuthenticated: false,
      userDetail: {},
      redirect: '/',
      message: '',
    };
  }
  return response;
};
/** Get session items function */
export const getSessionItem = key => {
  let value = localStorage.getItem(key);

  switch (key) {
    case 'token':
      return value == 'null' ? null : value;
    case 'isAuthenticated':
      return value == 'true';
    case 'redirect':
    case 'message':
      return value;
    case 'userDetail':
      try{
        value = JSON.parse(new Object(value));
      }catch{
        value = {};
      }
      return value;
  }
  return value;
};
