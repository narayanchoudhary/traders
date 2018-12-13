import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class AddressNew extends React.Component {
    render() {
        return (
            <div>
                <Modal fade={true} isOpen={this.props.isModalOpen} toggle={this.props.toggle} centered >
                    <ModalHeader toggle={this.props.toggle}>New Address</ModalHeader>
                    <Form>
                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" placeholder="Enter Address" />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={this.props.toggle}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default AddressNew;