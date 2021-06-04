import React, { Component } from 'react';

import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

class MultipleChoice extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentButton: "",
        };
    }

    componentDidMount() {
        if(this.props.answer != null){
            this.setState({currentButton: this.props.answer});
        }
    }

    handleRadioChange(newValue){
        this.setState({currentButton: newValue});
    }

    render() {
        // only 1 static question is needed, if given time, would fetch data from database for templates
        return <div className="container">
            <p>When was BCIT's 50<sup>th</sup> anniversary celebration?</p>
            <div className="container">
                <ToggleButtonGroup type="radio" name="radio" >
                    <ToggleButton disabled={this.props.answer != null}
                            type="radio"
                            name="radio"
                            value={ 2016 }
                            onChange={(e)=> this.handleRadioChange(e.target.value)}
                        >
                        2016
                    </ToggleButton>
                    <ToggleButton disabled={this.props.answer != null}
                            type="radio"
                            name="radio"
                            value={ 1967 }
                            onChange={(e)=> this.handleRadioChange(e.target.value)}
                        >
                        1967
                    </ToggleButton>
                    <ToggleButton disabled={this.props.answer != null}
                            type="radio"
                            name="radio"
                            value={ 2017 }
                            onChange={(e)=> this.handleRadioChange(e.target.value)}
                        >
                        2017
                    </ToggleButton>
                    <ToggleButton disabled={this.props.answer != null}
                            type="radio"
                            name="radio"
                            value={ 1987 }
                            onChange={(e)=> this.handleRadioChange(e.target.value)}
                        >
                        1987
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <br />
            <br />
            <br />
            { this.props.answer ?
            <div>
                <p>You have submitted your answer. Your answer: { this.props.answer } Your Grade:</p>
                { this.props.grade == null ?
                    <p>Awaiting grade from instructor</p> :
                    <p>{ this.props.grade } / 100</p>
                }
            </div> :
            <Button
                onClick={()=>{
                    if(this.state.currentButton != ""){
                        this.props.submissionHandler(this.props.ID, this.state.currentButton);
                    }else{
                        alert("Please select one option from the list.")
                    }
                }}
            >
                Submit Answer
            </Button> 
            }
        </div>
    }
}

export default MultipleChoice;