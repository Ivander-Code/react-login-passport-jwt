/** Dependencies */
import { setIn } from 'immutable';
/** Action Types */
import {
  LOG_OUT,
  SIGN_IN,
  SIGN_UP,
  VERIFY_SESSION,
  CLEAN_MESSAGE,
} from '../actionTypes/authTypes';

/** App reducer */
const reducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
    case VERIFY_SESSION:
      return {
        ...state,
        session: {
          message: action.payload.message,
          redirect: action.payload.redirect,
          isAuthenticated: action.payload.isAuthenticated,
          userDetail: action.payload.userDetail,
          token: action.payload.token,
        },
      };
    case LOG_OUT:
      return {
        ...state,
        session: {
          message: '',
          redirect: '/',
          isAuthenticated: false,
          userDetail: {},
          token: null,
        },
      };
    case CLEAN_MESSAGE:
      return Object.assign({}, state, setIn(state, ['session', 'message'], ''));
    default:
      return state;
  }
};
export default reducer;
