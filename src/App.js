import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout';
import ListUsers from './components/Users/ListUsers';

import 'bootstrap/dist/css/bootstrap.min.css';
import CreateUser from "./components/Users/CreateUser";



const NoMatch = () => (
    <div>
        <h2>NoMatch</h2>
    </div>
);

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Layout path="/users" component={ListUsers}/>
                    <Layout exact path="/" component={CreateUser}/>
                    <Layout path="/create_user" component={CreateUser}/>
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}

export default App;
