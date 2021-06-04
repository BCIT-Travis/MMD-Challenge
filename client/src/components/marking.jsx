import React, { Component } from 'react';

import { Button, Form } from 'react-bootstrap';

class Marking extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentGrade: 0
        };
    }

    componentDidMount() {
        if(this.props.grade != null){
            this.setState({currentGrade: this.props.grade});
        }
    }

    handleMarkChange = (newValue) => {
        this.setState({currentGrade: newValue});
    }

    handleSubmit = () => {
        if(this.state.currentGrade < 0 || this.state.currentGrade > 100){
            alert("Please enter a valid grade between 0 and 100");
        }else{
            this.props.submissionHandler(this.props.assignment.id, this.state.currentGrade);
        }
    }

    render() {
        return <div className="assignment-marking container">
            <h3>{ this.props.assignment.type } assigned to { this.props.assignment.student }</h3>
            <hr />
            { this.props.assignment.submittedAnswer == null ? 
                <p>This assignment hasn't been submitted yet.</p>
            : 
                <div>
                    { this.props.assignment.grade == null ? 
                        <div>
                        <Form>
                            <p>Please enter a grade for the assignment</p>
                            <p> <Form.Control
                                className="d-inline"
                                type="number"
                                value={this.state.currentGrade}
                                onChange={(e) => {this.handleMarkChange(e.target.value)}}
                            />  / 100 </p>
                        </Form>
                        <Button variant="primary" type="button"
                            onClick={ this.handleSubmit }
                        >
                            Submit Grade
                        </Button>
                    </div>
                    :
                    <Form>
                        <p>This assignment already has a grade.</p>
                        <p> <Form.Control
                            className="d-inline"
                            disabled
                            type="number"
                            value={this.state.currentGrade}
                        />  / 100 </p>
                    </Form>
                    }
                </div>
            }
            
        </div>;
    }
}

export default Marking;