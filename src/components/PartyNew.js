import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import RenderSelectField from './RenderSelectField';
import RenderInputField from './RenderInputField';
import { toggleNewAddressModal, fetchAddresses } from '../store/actions/Address';
import { connect } from 'react-redux';
import PlusButton from './PlusButton';
import { validateParty } from '../utils';
const remote = window.require("electron").remote;
const partiesDB = remote.getGlobal('partiesDB');

class PartyNew extends React.Component {
    onSubmit = (values) => {
        return new Promise((resolve, reject) => {
            partiesDB.findOne({ partyName: values.partyName.toLowerCase(), address: values.address.value }, (err, party) => {
                if (party === null) {
                    partiesDB.insert({ partyName: values.partyName.toLowerCase(), address: values.address.value }, (err, newDoc) => {
                        this.props.toggle();
                        this.props.getParties();
                        this.props.reset();
                        this.props.destroy();
                        resolve();
                    });
                } else {
                    reject();
                }
            });
        }).then(() => {

        }).catch(() => {
            throw new SubmissionError({
                partyName: 'Party already exists',
                _error: 'Save failed',
            });
        });
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div>
                <Modal fade={true} isOpen={this.props.isModalOpen} toggle={this.props.toggle} centered autoFocus={false} >
                    <ModalHeader toggle={this.props.toggle}>New Party</ModalHeader>
                    <Form onSubmit={handleSubmit(this.onSubmit)}>
                        <ModalBody>
                            <Field
                                name="partyName"
                                component={RenderInputField}
                                type="text"
                                placeholder="Enter Party"
                                autoFocus
                                label="Name"
                            />
                            <Field
                                name="address"
                                component={RenderSelectField}
                                placeholder="Select Address"
                                options={this.props.addressOptions}
                                label="Address"
                                plusButton={() => <PlusButton onClick={this.props.toggleNewAddressModal} />}
                            />
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

const newPartyForm = reduxForm({ form: 'newParty', validate: validateParty })(PartyNew);

const mapStateToProps = state => {
    return {
        addressOptions: state.address.addressOptions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNewAddressModal: () => dispatch(toggleNewAddressModal),
        fetchAddress: () => dispatch(fetchAddresses)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(newPartyForm);