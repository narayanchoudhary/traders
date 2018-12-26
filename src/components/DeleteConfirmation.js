import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

const DeleteConfirmation = (props) => {
    return (
        <Modal isOpen={props.isModalOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Are you sure?</ModalHeader>
            <ModalFooter>
                <Button color="danger" onClick={props.onSuccess}>Delete</Button>{' '}
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteConfirmation;