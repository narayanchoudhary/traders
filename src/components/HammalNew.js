import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { toggleNewHammalModal, fetchHammals } from '../store/actions/Hammals';
import RenderInputField from './RenderInputField';
const remote = window.require("electron").remote;
const hammalsDB = remote.getGlobal('hammalsDB');

const validate = values => {
    const errors = {}
    if (!values.hammal) {
        errors.hammal = 'Required'
    } else if (values.hammal.length > 20) {
        errors.hammal = 'Must be 15 characters or less'
    }
    return errors
}

class HammalNew extends Component {

    onSubmit = (values) => {
        hammalsDB.insert({ hammalName: values.hammalName.toLowerCase() }, (err, newDoc) => {
            this.props.toggle();
            this.props.fetchHammals();
        });
        this.props.reset();
        this.props.destroy();
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div>
                <Modal fade={true} isOpen={this.props.isModalOpen} toggle={this.props.toggle} centered autoFocus={false} >
                    <ModalHeader toggle={this.props.toggle}>New Hammal</ModalHeader>
                    <Form onSubmit={handleSubmit(this.onSubmit)}>
                        <ModalBody>
                            <FormGroup>
                                <Field
                                    name="hammalName"
                                    component={RenderInputField}
                                    type="text"
                                    placeholder="Enter Hammal"
                                    lebel="Hammal"
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

const newHammalForm = reduxForm({ form: 'newHammal', validate })(HammalNew);

const mapStateToProps = state => {
    return {
        isModalOpen: state.hammal.isNewHammalModalOpen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: () => dispatch(toggleNewHammalModal),
        fetchHammals: () => dispatch(fetchHammals)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(newHammalForm);