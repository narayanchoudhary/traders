import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { toggleNewItemModal, fetchItems } from '../store/actions/Items';
import RenderInputField from './RenderInputField';
const remote = window.require("electron").remote;
const itemsDB = remote.getGlobal('itemsDB');

const validate = values => {
    const errors = {}
    if (!values.item) {
        errors.item = 'Required'
    } else if (values.item.length > 20) {
        errors.item = 'Must be 15 characters or less'
    }
    return errors
}

class ItemNew extends Component {

    onSubmit = (values) => {
        itemsDB.insert({ itemName: values.itemName.toLowerCase() }, (err, newDoc) => {
            this.props.toggle();
            this.props.fetchItems();
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
                                    name="itemName"
                                    component={RenderInputField}
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

const newItemForm = reduxForm({ form: 'newItem', validate })(ItemNew);

const mapStateToProps = state => {
    return {
        isModalOpen: state.item.isNewItemModalOpen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: () => dispatch(toggleNewItemModal),
        fetchItems: () => dispatch(fetchItems)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(newItemForm);