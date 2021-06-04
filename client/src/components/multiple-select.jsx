import React, { Component } from 'react';

import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

class MultipleSelect extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentButtons: [],
        };
    }

    handleCheckboxChange(newValue){
        if(this.state.currentButtons.includes(newValue)){
            this.setState(prevState => ({ currentButtons: prevState.currentButtons.filter(butNum => butNum !== newValue) }));
        }else{
            this.setState({ currentButtons: [...this.state.currentButtons, newValue] });
        }
    }

    componentDidMount() {
        if(this.props.answer != null){
            this.setState({currentButtons: this.props.answer});
        }
    }

    render() {
        // only 1 static question is needed, if given time, would fetch data from database for templates
        return <div className="container">
            <p>Which of the following services does the LTC provide? Select all that apply.</p>
            <div className="container">
                <ToggleButtonGroup type="checkbox" name="checkbox" className="flex-column">
                    <ToggleButton className="my-2" 
                            disabled={this.props.answer != null}
                            type="checkbox"
                            name="checkbox"
                            value={ "Technical Illustration" }
                            onChange={(e)=> this.handleCheckboxChange(e.target.value)}
                        >
                        Technical Illustration
                    </ToggleButton>
                    <ToggleButton className="my-2"
                            disabled={this.props.answer != null}
                            type="checkbox"
                            name="checkbox"
                            value={ "Instructional Design" }
                            onChange={(e)=> this.handleCheckboxChange(e.target.value)}
                        >
                        Instructional Design
                    </ToggleButton>
                    <ToggleButton className="my-2"
                            disabled={this.props.answer != null}
                            type="checkbox"
                            name="checkbox"
                            value={ "Finacial Advice" }
                            onChange={(e)=> this.handleCheckboxChange(e.target.value)}
                        >
                        Finacial Advice
                    </ToggleButton>
                    <ToggleButton className="my-2"
                            disabled={this.props.answer != null}
                            type="checkbox"
                            name="checkbox"
                            value={ "Admission and Registration" }
                            onChange={(e)=> this.handleCheckboxChange(e.target.value)}
                        >
                        Admission and Registration
                    </ToggleButton>
                    <ToggleButton className="my-2"
                            disabled={this.props.answer != null}
                            type="checkbox"
                            name="checkbox"
                            value={ "Audio-visual loans" }
                            onChange={(e)=> this.handleCheckboxChange(e.target.value)}
                        >
                        Audio-visual loans
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <br />
            <br />
            <br />
            { this.props.answer ?
            <div>
                <p>You have submitted your answer. Your answer: <ul>{ 
                    this.props.answer.map((answer) => {
                        return <li>{answer}</li>
                 })}</ul> Your Grade:</p>
                { this.props.grade == null ?
                    <p>Awaiting grade from instructor</p> :
                    <p>{ this.props.grade } / 100</p>
                }
            </div> :
            <Button
                onClick={()=>{
                    if(this.state.currentButtons.length > 0){
                        this.props.submissionHandler(this.props.ID, this.state.currentButtons);
                    }else{
                        alert("Please select at least one option from the list.");
                    }
                }}
            >
                Submit Answer
            </Button> 
            }
        </div>
    }
}

export default MultipleSelect;