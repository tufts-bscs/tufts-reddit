import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';
import { Home } from './pages/home';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}
