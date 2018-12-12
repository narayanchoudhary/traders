import React from 'react';
import classes from '../css/pageHeading.module.css';

const PageHeading = (props) => {
    return (
        <div className={classes.pageHeading}>
            <h4>
                {props.children}
            </h4>
        </div>
    );
};

export default PageHeading;