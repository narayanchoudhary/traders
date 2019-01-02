import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { toggleNewAddressModal, fetchAddresses } from '../store/actions/Addresses';
import RenderInputField from './RenderInputField';
const remote = window.require("electron").remote;
const addressesDB = remote.getGlobal('addressesDB');

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
                                    component={RenderInputField}
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