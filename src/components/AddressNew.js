import React, { Fragment, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import classes from '../css/AddressNew.module.css';
import { connect } from 'react-redux';
import { toggleNewAddressModal, fetchAddresses } from '../store/actions/Address';
const remote = window.require("electron").remote;
const addressesDB = remote.getGlobal('addressesDB');

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
                className={classes.newAddressInput}
            />
            {(error && <FormFeedback>{error}</FormFeedback>)}
            <FormText>Enter address</FormText>
        </Fragment>
    )
}

const validate = values => {
    const errors = {}
    if (!values.address) {
        errors.address = 'Required'
    } else if (values.address.length > 20) {
        errors.address = 'Must be 15 characters or less'
    }
    return errors
}

class AddressNew extends Component {

    onSubmit = (values) => {
        addressesDB.insert({ address: values.address.toLowerCase() }, (err, newDoc) => {
            this.props.toggle();
            this.props.fetchAddresses();
        });
        this.props.reset();
        this.props.destroy();
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div>
                <Modal fade={true} isOpen={this.props.isModalOpen} toggle={this.props.toggle} centered autoFocus={false} >
                    <ModalHeader toggle={this.props.toggle}>New Address</ModalHeader>
                    <Form onSubmit={handleSubmit(this.onSubmit)}>
                        <ModalBody>
                            <FormGroup>
                                <Field
                                    name="address"
                                    component={renderField}
                                    type="text"
                                    placeholder="Enter Address"
                                    lebel="Address"
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

const newAddressForm = reduxForm({ form: 'newAddress', validate })(AddressNew);

const mapStateToProps = state => {
    return {
        isModalOpen: state.address.isNewAddressModalOpen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: () => dispatch(toggleNewAddressModal),
        fetchAddresses: () => dispatch(fetchAddresses)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(newAddressForm);