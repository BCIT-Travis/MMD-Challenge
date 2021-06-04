import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Button, Form } from 'react-bootstrap';

// boy this sure looks alot like assignments... gotta dev fast!
class AddStudents extends Component {
    constructor(props){
        super(props);

        this.state = {
            students: [],
            currentNameField: "",
            currentIDField: "",
            currentPasswordField: ""
        };
    }

    // make sure to fetch our students first, or otherwise put us back to login
    componentDidMount() {
        this.refreshView();
    }

    refreshView() {
        if(this.props.user.userName == null && this.props.user.userType !== "instructor") {
            alert("Please login as an instructor.");
            this.props.history.push("/login");
            return;
        }else{
            axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/students`, {
            params: {
                userID: this.props.user.userID,
                userType: this.props.user.userType
            },
            }).then((response) => {
                console.log(response);
                let data = response.data;
                this.setState({ students: data });
            })
            .catch((error) => {
                console.error("Login error:", error);
            });

            this.setState({
                currentNameField: "",
                currentIDField: "",
                currentPasswordField: ""
            })
        }

    }

    // keep in mind for simplicity i'm not checking for dupe ids from the database first
    submitStudent = (data) => {
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/students`, {
            action: "add-student",
            studentID: data.id,
            studentName: data.name,
            studentPassword: data.password
          })
          .then((response) => {
            console.log(response);
            // simply refresh the view with the updated state from server
            this.refreshView();
            alert("Student added!");
          })
          .catch((error) => {
            console.error(error);
          });
    }

    handleAddStudent = () => {
        if(this.state.currentNameField == "" || this.state.currentIDField == "" || this.state.currentPasswordField == "" ) {
            alert("Ensure all fields have some data in them.");
        }else{
            this.submitStudent({
                id: this.state.currentIDField,
                name: this.state.currentNameField,
                password: this.state.currentPasswordField
            });
        }
    }

    handleNameChange(newValue){
        this.setState({currentNameField: newValue});
    }

    handleIDChange(newValue){
        this.setState({currentIDField: newValue});
    }

    handlePasswordChange(newValue){
        this.setState({currentPasswordField: newValue});
    }

    renderStudents(student, index) {
        const rendered = <div className="marking-box">
            <p>Name: { student.name }</p>
            <p>ID: { student.id }</p>
        </div>

         return rendered;
    }

    render() {
        return <div className="container">
            { this.props.user.userType === "instructor" && 
                <div>
                    <h2>Current Students:</h2>
                    <hr />
                    {this.state.students.map((student, index) => {
                        return this.renderStudents(student, index);
                    })}
                    <br />
                    <hr />
                    <div>
                        <h2>Add a student:</h2>
                        <Form>
                            <p>Name:</p>
                            <Form.Control
                                type="text"
                                value={this.state.currentNameField}
                                onChange={(e) => {this.handleNameChange(e.target.value)}}
                            />
                            <p>ID:</p>
                            <Form.Control
                                type="text"
                                value={this.state.currentIDField}
                                onChange={(e) => {this.handleIDChange(e.target.value)}}
                            />
                            <p>Password:</p>
                            <Form.Control
                                type="text"
                                value={this.state.currentPasswordField}
                                onChange={(e) => {this.handlePasswordChange(e.target.value)}}
                            />
                        </Form>
                        <br />
                        <Button variant="primary" type="button"
                            onClick={ this.handleAddStudent }
                        >
                            Add Student
                        </Button>
                    </div>
                </div>
            }
        </div>
    }
}

export default withRouter(AddStudents);