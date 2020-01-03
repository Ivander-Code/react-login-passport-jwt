import React, {useRef} from 'react';
import SingUpFrm from './containers/SingUpFrm';
import SingInFrm from './containers/SingInFrm';
import Home from './views/Home';
import NotFoud from './views/NotFoud';
import Profile from "./views/Profile";
import PrivatePage from "./views/PrivatePage";
import Navbar from './components/Navbar';
import {Router, Route, Switch} from 'react-router-dom';
import history from "./helpers/history";

function App() {
    let message = useRef('');

    return (
        <div className="App">
            <Navbar/>
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/singup' render={(props)=>
                        <SingUpFrm {...props}/>
                    } />
                    <Route path='/singin' component={SingInFrm} />
                    <PrivatePage path='/profile' message={message.current}>
                        <Profile/>
                    </PrivatePage>
                    <Route component={NotFoud}/>
                </Switch>
            </Router>
        </div>
    );
}
export default App;
