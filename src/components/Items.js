import React, { Component } from 'react';
import ReactTable from "react-table";
import { Container, Button } from "reactstrap";
import PageHeading from './PageHeading';
import classes from '../css/Items.module.css';
import { toggleNewItemModal, fetchItems } from '../store/actions/Items';
import { connect } from 'react-redux';
const remote = window.require("electron").remote;
const itemsDB = remote.getGlobal('itemsDB');

class Items extends Component {

    handleDelete(id) {
        itemsDB.remove({ _id: id }, {}, (err, numRemoved) => {
            this.props.fetchItems();
        });
    }

    toggle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleEdit = (id, value) => {
        itemsDB.update({ _id: id }, { itemName: value }, () => {
            this.props.fetchItems();
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
                        __html: this.props.items[cellInfo.index][cellInfo.column.id]
                    }}
                />
                <Button className={classes.deleteButton} close onClick={() => this.handleDelete(cellInfo.row._id)} ></Button>
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchItems();
    }

    render() {
        return (
            <Container fluid>
                <PageHeading>Items</PageHeading>
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <ReactTable
                            data={this.props.items}
                            columns={[
                                {
                                    Header: "Item",
                                    accessor: "itemName",
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
                        <Button autoFocus outline className="mt-2" block color="primary" onClick={this.props.toggleNewItemModal} >New Item</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.item.items,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNewItemModal: () => dispatch(toggleNewItemModal),
        fetchItems: () => dispatch(fetchItems)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);