import React, { Component } from 'react';
import ReactTable from "react-table";
import { Container, Button } from "reactstrap";
import PageHeading from './PageHeading';
import classes from '../css/Stores.module.css';
import { toggleNewStoreModal, fetchStores } from '../store/actions/Stores';
import { connect } from 'react-redux';
const remote = window.require("electron").remote;
const storesDB = remote.getGlobal('storesDB');

class Stores extends Component {

    handleDelete(id) {
        storesDB.remove({ _id: id }, {}, (err, numRemoved) => {
            this.props.fetchStores();
        });
    }

    toggle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleEdit = (id, value) => {
        storesDB.update({ _id: id }, { store: value }, () => {
            this.props.fetchStores();
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
                        __html: this.props.stores[cellInfo.index][cellInfo.column.id]
                    }}
                />
                <Button className={classes.deleteButton} close onClick={() => this.handleDelete(cellInfo.row._id)} ></Button>
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchStores();
    }

    render() {
        return (
            <Container fluid>
                <PageHeading>Stores</PageHeading>
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <ReactTable
                            data={this.props.stores}
                            columns={[
                                {
                                    Header: "Store",
                                    accessor: "store",
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
                        <Button autoFocus outline className="mt-2" block color="primary" onClick={this.props.toggleNewStoreModal} >New Store</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        stores: state.store.stores,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNewStoreModal: () => dispatch(toggleNewStoreModal),
        fetchStores: () => dispatch(fetchStores)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stores);