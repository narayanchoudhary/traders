import React, { Component } from 'react';
import ReactTable from "react-table";
import { Container, Button } from "reactstrap";
import PageHeading from './PageHeading';
import classes from '../css/Addresses.module.css';
import AddressNew from './AddressNew';
const remote = window.require("electron").remote;
const addressesDB = remote.getGlobal('addressesDB');

class Addresses extends Component {
    state = {
        addresses: [],
        isModalOpen: false // New Address Modal
    }

    handleDelete(id) {
        addressesDB.remove({ _id: id }, {}, (err, numRemoved) => {
            this.getAddresses();
        });
    }

    toggle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleEdit = (id, value) => {
        addressesDB.update({ _id: id }, { address: value }, () => {
            this.getAddresses();
        });
    }

    renderEditable = (cellInfo) => {
        return (
            <div className={classes.wrapper}>
                <div
                    className={classes.renderEditable}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => {
                        const addresses = [...this.state.addresses];
                        addresses[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.setState({ addresses });
                        this.handleEdit(cellInfo.row._id, e.target.innerHTML);
                    }}
                    dangerouslySetInnerHTML={{
                        __html: this.state.addresses[cellInfo.index][cellInfo.column.id]
                    }}
                />
                <Button className={classes.deleteButton} close onClick={() => this.handleDelete(cellInfo.row._id)} ></Button>
            </div>
        );
    }

    componentDidMount() {
        this.getAddresses();
    }

    getAddresses = () => {
        addressesDB.find({}).sort({ createdAt: -1 }).exec((err, addresses) => {
            this.setState({ ...this.state, addresses: addresses })
        });
    }

    render() {
        return (
            <Container fluid>
                <PageHeading>Addresses</PageHeading>
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <ReactTable
                            data={this.state.addresses}
                            columns={[
                                {
                                    Header: "Address",
                                    accessor: "address",
                                    Cell: this.renderEditable,
                                    filterable: true,
                                    filterMethod: (filter, row) => {
                                        let cell = row[filter.id].toLowerCase();
                                        let filterValue = filter.value.toLowerCase();
                                        return cell.startsWith(filterValue) || cell.endsWith(filterValue);
                                    }
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
                        <Button autoFocus outline className="mt-2" block color="primary" onClick={this.toggle} >New Address</Button>
                        <AddressNew
                            isModalOpen={this.state.isModalOpen}
                            toggle={this.toggle}
                            getAddresses={this.getAddresses}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

export default Addresses;