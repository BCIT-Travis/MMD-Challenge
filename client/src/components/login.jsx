import React, { Component } from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
          currentUserID: "",
          currentPassword: ""
        };
    }

    routeChange=()=> {
        
      }

    tryLogin = () => {
        if(this.state.currentUserID == "" || this.state.currentPassword == "") {
            alert("Please ensure you have both an ID and password entered");
            return;
        }

        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/login`, {
            params: {
                userID: this.state.currentUserID,
                userPassword: this.state.currentPassword
            },
        }).then((response) => {
            console.log(response);
            const data = response.data;
            if(data.length > 0){
                this.props.updateUser({
                    userName: data[0].name,
                    userID: data[0].id,
                    userType: data[0].type
                });
    
                this.props.history.push("/assignments");
            }else{
                alert("ID or password not found, please try again.");
            }
        })
        .catch((error) => {
            console.error("Login error:", error);
        });
    }

    render() {
        return <div className="container">
            <p>Please Login.</p>
            <Form>
            <Form.Group controlId="formLoginID">
                <Form.Label>Login ID Number</Form.Label>
                <Form.Control type="text" placeholder="Enter ID Number" 
                    value={this.state.currentUserID}
                    onChange={e => this.setState({ currentUserID: e.target.value })}
                />
                <Form.Text className="text-muted">
                Your ID number should start with a letter followed by 6 numbers
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                    value={this.state.currentPassword}
                    onChange={e => this.setState({ currentPassword: e.target.value })}
                />
            </Form.Group>
            <Button variant="primary" type="button"
                onClick={ this.tryLogin }
            >
                Submit
            </Button>
            </Form>
        </div>
    }
}

export default withRouter(Login);