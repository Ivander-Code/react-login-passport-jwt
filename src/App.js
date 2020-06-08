/**Dependencies */
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
/** Container components */
import SignUpFrm from './containers/SignUpFrm';
import SignInFrm from './containers/SignInFrm';
/** View components */
import Home from './views/Home';
import NotFoud from './views/NotFoud';
import Profile from './views/Profile';
import PrivatePage from './views/PrivatePage';
/** Component */
import Navbar from './components/Navbar';
/** Helper */
import history from './helpers/history';
/** Main app component */
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={SignUpFrm} />
          <Route path='/signin' component={SignInFrm} />
          <PrivatePage path='/profile'>
            <Profile />
          </PrivatePage>
          <Route component={NotFoud} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
