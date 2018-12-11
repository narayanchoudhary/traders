import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import classes from '../css/Home.module.css';

class Home extends Component {
    render() {
        return (
            <div className={classes.wrapper}>
                <div>
                    <Alert color="primary">
                        Welcome :) , Narayan
                </Alert>
                </div>
            </div>
        );
    }
}

export default Home;