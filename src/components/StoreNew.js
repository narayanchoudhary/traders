import React, { Fragment, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import classes from '../css/StoreNew.module.css';
import { connect } from 'react-redux';
import { toggleNewStoreModal, fetchStores } from '../store/actions/Stores';
const remote = window.require("electron").remote;
const storesDB = remote.getGlobal('storesDB');

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
                className={classes.newStoreInput}
            />
            {(error && <FormFeedback>{error}</FormFeedback>)}
            <FormText>Enter store</FormText>
        </Fragment>
    )
}

const validate = values => {
    const errors = {}
    if (!values.store) {
        errors.store = 'Required'
    } else if (values.store.length > 20) {
        errors.store = 'Must be 15 characters or less'
    }
    return errors
}

class StoreNew extends Component {

    onSubmit = (values) => {
        storesDB.insert({ store: values.store.toLowerCase() }, (err, newDoc) => {
            this.props.toggle();
            this.props.fetchStores();
        });
        this.props.reset();
        this.props.destroy();
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div>
                <Modal fade={true} isOpen={this.props.isModalOpen} toggle={this.props.toggle} centered autoFocus={false} >
                    <ModalHeader toggle={this.props.toggle}>New Store</ModalHeader>
                    <Form onSubmit={handleSubmit(this.onSubmit)}>
                        <ModalBody>
                            <FormGroup>
                                <Field
                                    name="store"
                                    component={renderField}
                                    type="text"
                                    placeholder="Enter Store"
                                    lebel="Store"
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

const newStoreForm = reduxForm({ form: 'newStore', validate })(StoreNew);

const mapStateToProps = state => {
    return {
        isModalOpen: state.store.isNewStoreModalOpen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: () => dispatch(toggleNewStoreModal),
        fetchStores: () => dispatch(fetchStores)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(newStoreForm);