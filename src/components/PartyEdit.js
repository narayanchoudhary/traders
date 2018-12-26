import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import RenderSelectField from './RenderSelectField';
import { fetchAddresses, toggleNewAddressModal } from '../store/actions/Address';
import { fetchParty } from '../store/actions/Party';
import { connect } from 'react-redux';
import PlusButton from './PlusButton';
import RenderInputField from './RenderInputField';
import { validateParty } from '../utils';
const remote = window.require("electron").remote;
const partiesDB = remote.getGlobal('partiesDB');

class PartyEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchAddresses();
        if (this.props.partyId) {
            this.props.fetchParty(this.props.partyId, () => {
            });
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.partyId !== this.props.paryId) {
            if (this.props.partyId) {
                this.props.fetchParty(nextProps.partyId, () => {
                });
            }
        }
    }

    onSubmit = (values) => {
        return new Promise((resolve, reject) => {
            partiesDB.findOne({ partyName: values.partyName.toLowerCase(), address: values.address.value }, (err, party) => {
                if (party === null) {
                    partiesDB.update({ _id: this.props.partyId }, { partyName: values.partyName.toLowerCase(), address: values.address.value }, (err, editDoc) => {
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
                    <ModalHeader toggle={this.props.toggle}>Edit Party</ModalHeader>
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
                            <Button color="success" type="submit" disabled={submitting} >Save Changes</Button>{' '}
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const editPartyForm = reduxForm({ form: 'editParty', validate: validateParty, enableReinitialize: true })(PartyEdit);

const mapStateToProps = state => {
    return {
        addressOptions: state.address.addressOptions,
        initialValues: state.party.partyToBeEdited,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchParty: (partyId, thencallback) => dispatch(fetchParty(partyId, thencallback)),
        toggleNewAddressModal: () => dispatch(toggleNewAddressModal),
        fetchAddresses: () => dispatch(fetchAddresses),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(editPartyForm);