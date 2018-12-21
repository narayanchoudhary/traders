import React, { Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import classes from '../css/ItemNew.module.css';
const remote = window.require("electron").remote;
const itemsDB = remote.getGlobal('itemsDB');

const renderField = ({ input, label, type, autoFocus, meta: { touched, invalid, valid, error } }) => {
    return (
        <Fragment>
            <Label>{label}</Label>
            <Input
                {...input}
                type={type}
                autoFocus={autoFocus}
                invalid={touched && invalid}
                valid={touched && valid}
                className={classes.newItemInput}
            />
            {(error && <FormFeedback>{error}</FormFeedback>)}
            <FormText>Enter item</FormText>
        </Fragment>
    )
}

const validate = values => {
    const errors = {}
    if (!values.item) {
        errors.item = 'Required'
    } else if (values.item.length > 20) {
        errors.item = 'Must be 15 characters or less'
    }
    return errors
}


class ItemNew extends React.Component {

    onSubmit = (values) => {
        itemsDB.insert({ item: values.item.toLowerCase() }, (err, newDoc) => {
            this.props.toggle();
            this.props.getItems();
        });
        this.props.reset();
        this.props.destroy(); 
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div>
                <Modal fade={true} isOpen={this.props.isModalOpen} toggle={this.props.toggle} centered autoFocus={false} >
                    <ModalHeader toggle={this.props.toggle}>New Item</ModalHeader>
                    <Form onSubmit={handleSubmit(this.onSubmit)}>
                        <ModalBody>
                            <FormGroup>
                                <Field
                                    name="item"
                                    component={renderField}
                                    type="text"
                                    placeholder="Enter Item"
                                    lebel="Item"
                                    autoFocus
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" disabled={submitting} >Save</Button>{' '}
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default reduxForm({
    form: 'newItem',
    validate  // a unique identifier for this form
})(ItemNew)