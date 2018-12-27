import React, { Component } from 'react';
import ReactTable from "react-table";
import { Container, Button } from "reactstrap";
import PageHeading from './PageHeading';
import classes from '../css/Parties.module.css';
import PartyNew from './PartyNew';
import PartyEdit from './PartyEdit';
import { connect } from 'react-redux';
import { fetchAddresses } from '../store/actions/Addresses';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteConfirmation from './DeleteConfirmation';

library.add(faEdit);
library.add(faTrash);


const remote = window.require("electron").remote;
const partiesDB = remote.getGlobal('partiesDB');
const addressesDB = remote.getGlobal('addressesDB');

class Parties extends Component {
    state = {
        parties: [],
        isModalOpen: false, // New Party Modal
        isDeleteConfirmationModalOpen: false,
        isPartyEditModalOpen: false,
        partyIdToBeDeleted: null,
        partyIdToBeEdited: null
    }

    toggle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
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

    componentDidMount() {
        this.getParties();
    }

    deleteParty = () => {
        partiesDB.remove({ _id: this.state.partyIdToBeDeleted }, {}, (err, numRemoved) => {
            this.getParties();
            this.toggleDeleteConfirmationModal();
        });
    }

    getParties = () => {
        partiesDB.find({}).sort({ createdAt: -1 }).exec((err, parties) => {
            addressesDB.find({}, (err, addresses) => {

                // create array of parties
                let partiesWithAddress = [];
                parties.forEach(party => {
                    addresses.forEach(address => {
                        if (party.address === address._id) {
                            partiesWithAddress.push({ _id: party._id, partyName: party.partyName, address: address.address });
                        }
                    });
                });
                this.setState({ ...this.state, parties: partiesWithAddress })
            });
        });
    }


    renderActionColumn = (row) => {
        return (
            <div className={classes.actionColumnWrapper}>
                <FontAwesomeIcon icon="edit" color="green" onClick={() => this.handleEdit(row.row._id)} className={classes.pointer} />
                <FontAwesomeIcon icon="trash" color="red" onClick={() => this.handleDelete(row.row._id)} className={classes.pointer} />
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
                            data={this.state.parties}
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
                        <Button autoFocus outline className="mt-2" block color="primary" onClick={this.toggle} >New Party</Button>
                        <PartyNew
                            isModalOpen={this.state.isModalOpen}
                            toggle={this.toggle}
                            getParties={this.getParties}
                        />
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
        addressOptions: state.address.addressOptions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAddresses: () => dispatch(fetchAddresses)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Parties);