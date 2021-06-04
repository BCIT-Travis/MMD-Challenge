import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import MultipleChoice from "components/multiple-choice";
import MultipleSelect from "components/multiple-select";
import FillInBlank from "components/fill-in-blank";
import Marking from "components/marking";

class Assignments extends Component {
    constructor(props){
        super(props);

        this.state = {
            assignments: [],
        };
    }

    // make sure to fetch our assignments first, or otherwise put us back to login
    componentDidMount() {
        this.refreshView();
    }

    refreshView() {
        if(this.props.user.userName == null) {
            alert("Please login.");
            this.props.history.push("/login");
            return;
        }

        if(this.props.user.userType === "student"){
            axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/assignments`, {
            params: {
                userID: this.props.user.userID,
                userType: this.props.user.userType
            },
            }).then((response) => {
                let data = response.data;
                data.forEach(x => {
                    if(x.submittedAnswer != null){
                        x.submittedAnswer = JSON.parse(x.submittedAnswer);
                    }
                });
                this.setState({ assignments: data });
            })
            .catch((error) => {
                console.error("Login error:", error);
            });
        }

        // this is redundant because for this quickly made app they'll get almost the same view
        if(this.props.user.userType === "instructor"){
            axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/assignments`, {
            params: {
                userID: this.props.user.userID,
                userType: this.props.user.userType
            },
            }).then((response) => {
                let data = response.data;
                data.forEach(x => {
                    if(x.submittedAnswer != null){
                        x.submittedAnswer = JSON.parse(x.submittedAnswer);
                    }
                });
                this.setState({ assignments: data });
            })
            .catch((error) => {
                console.error("Login error:", error);
            });
        }
    }

    // would make a generic for these 2 following methods in a seperate server request object
    submitAssignment = (assignmentID, data) => {
        const jsonData = JSON.stringify(data);
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/assignments`, {
            action: "submit-assignment",
            userID: this.props.user.userID,
            assignmentID: assignmentID,
            submissionAnswer: jsonData
          })
          .then((response) => {
            console.log(response);
            // simply refresh the view with the updated state from server
            this.refreshView();
          })
          .catch((error) => {
            console.error(error);
          });
    }

    gradeAssignment = (assignmentID, grade) => {
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/assignments`, {
            action: "grade-assignment",
            assignmentID: assignmentID,
            grade: grade
          })
          .then((response) => {
            console.log(response);
            // simply refresh the view with the updated state from server
            this.refreshView();
          })
          .catch((error) => {
            console.error(error);
          });
    }

    renderAssignment(assignment, index) {
        switch (assignment.type) {
            case "multiple-choice":
            return <div className="container p-2">
            <MultipleChoice 
                key={index}
                answer={assignment.submittedAnswer}
                grade={assignment.grade}
                ID={assignment.id}
                userType={this.props.user.userType}
                submissionHandler={this.submitAssignment}
            />
            <hr />
            </div>
            ;

            case "multiple-select":
            return <div className="container p-2">
            <MultipleSelect 
                key={index}
                answer={assignment.submittedAnswer}
                grade={assignment.grade}
                ID={assignment.id}
                userType={this.props.user.userType}
                submissionHandler={this.submitAssignment}
            />
            <hr />
            </div>;

            case "fill-in-blank":
            return <div className="container p-2">
            <FillInBlank
                key={index}
                answer={assignment.submittedAnswer}
                grade={assignment.grade}
                ID={assignment.id}
                userType={this.props.user.userType}
                submissionHandler={this.submitAssignment}
            />
            <hr />
            </div>;

            default:
                break;
        }
    }

    renderMarking(assignment, index) {
        const rendered = <div className="marking-box">
            <Marking
            key = {index}
            assignment = {assignment}
            submissionHandler = {this.gradeAssignment}
         />
        </div>

         return rendered;
    }

    render() {
        return <div className="container">
            { this.props.user.userType === "student" && 
                <div className="container">
                    <h2>Your current assignments: </h2>
                    <hr />
                    {this.state.assignments.map((assignment, index) => {
                        return this.renderAssignment(assignment, index);
                    })} 
                </div>
             }
             { this.props.user.userType === "instructor" && 
                <div className="container">
                    <h2>Submitted assignments: </h2>
                    <hr />
                    {this.state.assignments.map((assignment, index) => {
                        return this.renderMarking(assignment, index);
                    })} 
                </div>
             }
        </div>
    }
}

export default withRouter(Assignments);