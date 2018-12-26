import ReactSelect from 'react-select';
import React from 'react';
import { Label, FormFeedback, FormGroup } from 'reactstrap';
import classes from '../css/RenderSelectField.module.css';

const renderSelectField = ({ input, label, type, options, plusButton, meta: { touched, invalid, valid, error } }) => {
    console.log('error: ', error);
    return (
        <FormGroup>
            <Label>{label}</Label>
            <div className={classes.selectWrapper}>
                <ReactSelect
                    value={input.value}
                    onChange={input.onChange}
                    onBlur={() => input.onBlur(input.value)}
                    type={type}
                    options={options}
                    className={classes.reactSelectField}
                />
                {plusButton && plusButton()}
            </div>
            {(error && <FormFeedback>{error}</FormFeedback>)}
        </FormGroup>
    )
}

export default renderSelectField;