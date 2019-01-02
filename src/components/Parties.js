import React, { Component } from 'react';
import ReactTable from "react-table";
import { Container, Button } from "reactstrap";
import PageHeading from './PageHeading';
import classes from '../css/Parties.module.css';
import PartyEdit from './PartyEdit';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteConfirmation from './DeleteConfirmation';
import { toggleNewPartyModal, fetchParties } from '../store/actions/Parties';

library.add(faEdit);
library.add(faTrash);


const remote = window.require("electron").remote;
const partiesDB = remote.getGlobal('partiesDB');

class Parties extends Component {
    state = {
        parties: [],
        isDeleteConfirmationModalOpen: false,
        isPartyEditModalOpen: false,
        partyIdToBeDeleted: null,
        partyIdToBeEdited: null
    }

    handleDelete = (partyId) => {
        this.setState({ partyIdToBeDeleted: partyId });
        this.toggleDeleteConfirmationModal();
    }

    handleEdit = (partyId) => {
        this.setState({ partyIdToBeEdited: partyId });
        this.togglePartyEditModal();
    }

    toggleDeleteConfirmationModal = () => {
        this.setState({ isDeleteConfirmationModalOpen: !this.state.isDeleteConfirmationModalOpen });
    }

    togglePartyEditModal = () => {
        this.setState({ isPartyEditModalOpen: !this.state.isPartyEditModalOpen });
    }

    deleteParty = () => {
        partiesDB.remove({ _id: this.state.partyIdToBeDeleted }, {}, (err, numRemoved) => {
            this.props.fetchParties();
            this.toggleDeleteConfirmationModal();
        });
    }

    renderActionColumn = (row) => {
        return (
            <div className={classes.actionColumnWrapper}>
                <FontAwesomeIcon icon="edit" color="green" onClick={() => this.handleEdit(row.row._id)} className="pointer" />
                <FontAwesomeIcon icon="trash" color="red" onClick={() => this.handleDelete(row.row._id)} className="pointer" />
            </div>
        );
    }

    render() {
        return (
            <Container fluid>
                <PageHeading>Parties</PageHeading>
                <div className="d-flex justify-content-center align-parties-center">
                    <div>
                        <ReactTable
                            data={this.props.partiesWithAddress}
                            columns={[
                                {
                                    Header: "Party",
                                    accessor: "partyName",
                                    className: classes.capitalize,
                                    minWidth: 250,
                                    filterable: true,
                                    Filter: ({ filter, onChange }) => (
                                        <input
                                            onChange={event => onChange(event.target.value)}
                                            value={filter ? filter.value : ''}
                                            placeholder="Search..."
                                            style={{
                                                width: '100%',
                                                textTransform: 'capitalize',
                                            }}
                                        />
                                    ),
                                },
                                {
                                    Header: "Address",
                                    accessor: "address",
                                    className: classes.capitalize,
                                    filterable: true,
                                    Filter: ({ filter, onChange }) => (
                                        <input
                                            onChange={event => onChange(event.target.value)}
                                            value={filter ? filter.value : ''}
                                            style={{
                                                width: '100%',
                                                textTransform: 'capitalize',
                                            }}
                                        />
                                    ),
                                },
                                {
                                    Header: "Actions",
                                    Cell: this.renderActionColumn,
                                },
                                {
                                    Header: "id",
                                    accessor: "_id",
                                    show: false
                                }
                            ]}
                            style={{
                                height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                        <Button autoFocus outline className="mt-2" block color="primary" onClick={this.props.toggleNewPartyModal} >New Party</Button>
                        <DeleteConfirmation
                            isModalOpen={this.state.isDeleteConfirmationModalOpen}
                            toggle={this.toggleDeleteConfirmationModal}
                            onSuccess={this.deleteParty}
                        />
                        <PartyEdit
                            isModalOpen={this.state.isPartyEditModalOpen}
                            toggle={this.togglePartyEditModal}
                            partyId={this.state.partyIdToBeEdited}
                            getParties={this.getParties}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        addresses: state.address.addresses,
        addressOptions: state.address.addressOptions,
        partiesWithAddress: state.party.partiesWithAddress,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNewPartyModal: () => dispatch(toggleNewPartyModal),
        fetchParties: () => dispatch(fetchParties())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Parties);