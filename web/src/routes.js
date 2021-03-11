import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './login';
import Register from './register';


export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                {/* <Redirect to="/" /> */}
            </Switch>
        </Router>
    );
}