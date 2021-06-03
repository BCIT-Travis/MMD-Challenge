import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Button } from 'react-bootstrap';

class Assignments extends Component {
    constructor(props){
        super(props);

        this.state = {
          
        };
    }

    // make sure to fetch our assignments first, or otherwise put us back to login
    componentDidMount() {

    }

    render() {
        return <div className="container">
            <p>assignments</p>
        </div>
    }
}

export default Assignments;