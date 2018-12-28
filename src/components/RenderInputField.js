import React from 'react';
import { Label, Input, FormFeedback, FormGroup } from 'reactstrap';
import classes from '../css/renderInputField.module.css';

const renderInputField = ({ input, label, type, autoFocus, placeholder, meta: { touched, invalid, valid, error } }) => {
    return (
        <FormGroup>
            <Label>{label}</Label>
            <Input
                {...input}
                type={type}
                autoFocus={autoFocus}
                invalid={touched && invalid}
                valid={touched && valid}
                className={classes.input}
                placeholder={placeholder}
            />
            {(error && <FormFeedback>{error}</FormFeedback>)}
        </FormGroup>
    )
}

export default renderInputField;
