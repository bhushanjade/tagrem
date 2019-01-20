import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout';
import ListUsers from './components/Users/ListUsers';

import 'bootstrap/dist/css/bootstrap.min.css';
import CreateUser from "./components/Users/CreateUser";

const Home = () => (
    <div>
        <h3>A simple web application using React.js and Redux with Reactstrap (Simple React Bootstrap 4 components)</h3>
        <p>Routes <code>/users</code> List All Users, In paginated table.</p>
        <p>Routes <code>/create_user</code>Create User form.</p>
    </div>
);


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
                    <Layout exact path="/" component={Home}/>
                    <Layout path="/create_user" component={CreateUser}/>
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}

export default App;
