import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import RenderSelectField from './RenderSelectField';
import RenderInputField from './RenderInputField';
import { toggleNewAddressModal } from '../store/actions/Addresses';
import { fetchParties } from '../store/actions/Parties';
import { connect } from 'react-redux';
import PlusButton from './PlusButton';
import { validatePurchase } from '../utils';

const remote = window.require("electron").remote;
const partiesDB = remote.getGlobal('partiesDB');

class PurchaseNew extends React.Component {
    onSubmit = (values) => {
        return new Promise((resolve, reject) => {
            partiesDB.findOne({ purchaseName: values.purchaseName.toLowerCase(), address: values.address.value }, (err, purchase) => {
                if (purchase === null) {
                    partiesDB.insert({ purchaseName: values.purchaseName.toLowerCase(), address: values.address.value }, (err, newDoc) => {
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
                purchaseName: 'Purchase already exists',
                _error: 'Save failed',
            });
        });
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div>
                <Modal fade={true} isOpen={this.props.isModalOpen} toggle={this.props.toggle} centered autoFocus={false} >
                    <ModalHeader toggle={this.props.toggle}>New Purchase</ModalHeader>
                    <Form onSubmit={handleSubmit(this.onSubmit)}>
                        <ModalBody>
                            <Field
                                name="date"
                                component={RenderInputField}
                                type="date"
                                placeholder="Date"
                                label="Date"
                            />
                            <Field
                                name="store"
                                component={RenderSelectField}
                                placeholder="Select Store"
                                options={this.props.storeOptions}
                                label="Store"
                            />
                            <Field
                                name="address"
                                component={RenderSelectField}
                                placeholder="Select Address"
                                options={this.props.addressOptions}
                                label="Address"
                            />
                            <Field
                                name="party"
                                component={RenderSelectField}
                                placeholder="Select Party"
                                options={this.props.partyOptions}
                                label="Party"
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

const newPurchaseForm = reduxForm({ form: 'newPurchase', validate: validatePurchase })(PurchaseNew);

const mapStateToProps = state => {
    return {
        addressOptions: state.address.addressOptions,
        partyOptions: state.party.partyOptions,
        storeOptions: state.store.storeOptions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNewAddressModal: () => dispatch(toggleNewAddressModal),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(newPurchaseForm);