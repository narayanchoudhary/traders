import React, { Component } from 'react';
import ReactTable from "react-table";
import { Container, Button } from "reactstrap";
import PageHeading from './PageHeading';
import classes from '../css/Addresses.module.css';
import { toggleNewAddressModal, fetchAddresses } from '../store/actions/Address';
import { connect } from 'react-redux';
const remote = window.require("electron").remote;
const addressesDB = remote.getGlobal('addressesDB');

class Addresses extends Component {

    handleDelete(id) {
        addressesDB.remove({ _id: id }, {}, (err, numRemoved) => {
            this.props.fetchAddresses();
        });
    }

    toggle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleEdit = (id, value) => {
        addressesDB.update({ _id: id }, { address: value }, () => {
            this.props.fetchAddresses();
        });
    }

    renderEditable = (cellInfo) => {
        return (
            <div className={classes.wrapper}>
                <div
                    className={classes.renderEditable}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => this.handleEdit(cellInfo.row._id, e.target.innerHTML)}
                    dangerouslySetInnerHTML={{
                        __html: this.props.addresses[cellInfo.index][cellInfo.column.id]
                    }}
                />
                <Button className={classes.deleteButton} close onClick={() => this.handleDelete(cellInfo.row._id)} ></Button>
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchAddresses();
    }

    render() {
        return (
            <Container fluid>
                <PageHeading>Addresses</PageHeading>
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <ReactTable
                            data={this.props.addresses}
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
                        <Button autoFocus outline className="mt-2" block color="primary" onClick={this.props.toggleNewAddressModal} >New Address</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        addresses: state.address.addresses,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNewAddressModal: () => dispatch(toggleNewAddressModal),
        fetchAddresses: () => dispatch(fetchAddresses)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Addresses);