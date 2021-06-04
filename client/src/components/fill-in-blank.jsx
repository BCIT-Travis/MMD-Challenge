import React, { Component } from 'react';

import { Button, Form } from 'react-bootstrap';

class FillInBlank extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentFill: "",
        };
    }

    componentDidMount() {
        if(this.props.answer != null){
            this.setState({currentFill: this.props.answer});
        }
    }

    handleBlankChange(newValue){
        this.setState({currentFill: newValue});
    }

    handleSubmit = () => {
        const regex = /[A-Za-z]+\s+[0-9]+/;
        if(this.state.currentFill != "" && regex.test(this.state.currentFill)){
            this.props.submissionHandler(this.props.ID, this.state.currentFill);
        }else{
            alert("Answer needs to be a single word, a space, and then a number");
        }
    }

    render() {
        // only 1 static question is needed, if given time, would fetch data from database for templates
        return <div className="container">
            <Form>
                <p>The current Prime Minister in Canada is (include the starting year for the PM) <Form.Control
                    disabled={this.props.answer != null}
                    className="d-inline fill-in-blank-field"
                    type="text"
                    value={this.state.currentFill}
                    onChange={(e) => {this.handleBlankChange(e.target.value)}}
                /></p>
            </Form>
            { this.props.answer ?
            <div>
                <p>You have submitted your answer. Your answer: { this.props.answer } Your Grade:</p>
                { this.props.grade == null ?
                    <p>Awaiting grade from instructor</p> :
                    <p>{ this.props.grade } / 100</p>
                }
            </div> :
            <Button variant="primary" type="button"
                onClick={ this.handleSubmit }
            >
                Submit Answer
            </Button>
            }
        </div>
    }
}

export default FillInBlank;