import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { Button } from 'react-bootstrap';

import Login from "components/login";
import Assignments from "components/assignments";

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            // need to make a full stack app in basically a day so hello plain unsecure credentials!
            user: {
                userName: null,
                userID: null,
                userType: null
            }
        };
    }

    updateUser = newUser => {
        this.setState({
            user: newUser,
        });
    }

    render() {
        console.log(this.state.user);
        return <div className="container">
            <Router>
                <div>
                    { this.state.user.userName != null &&
                        <p>Hello { this.state.user.userName }!</p>
                    }
                    <nav>
                    <ul>
                        <li>
                        <Link to="/">Login</Link>
                        </li>
                        
                        { (this.state.user.userType === "student" || this.state.user.userType === "instructor") && 
                        <li>
                            <Link to="/assignments">Assignments</Link>
                        </li>
                        }
                    </ul>
                    </nav>
                    <Switch>
                    <Route path="/assignments">
                        <Assignments
                            user = { this.state.user }
                         />
                    </Route>
                    <Route path="/">
                        <Login
                            updateUser = { this.updateUser }
                        />
                    </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    }
}

export default Main;