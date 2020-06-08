/** Dependencies */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/auth.reducer';
/** Service */
import {getSessionItem} from '../services/authentication.service';
/** Store */
export default new createStore(
  reducer,
  {
    session: {
      message: getSessionItem('message'),
      redirect: getSessionItem('redirect'),
      isAuthenticated: getSessionItem('isAuthenticated'),
      userDetail: getSessionItem('userDetail'),
      token: getSessionItem('token'),
    },
  },
  applyMiddleware(thunk)
);
