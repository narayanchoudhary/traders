import React, { Component } from 'react';
import ReactTable from "react-table";
import { Container, Button } from "reactstrap";
import PageHeading from './PageHeading';
import classes from '../css/Items.module.css';
import ItemNew from './ItemNew';
const remote = window.require("electron").remote;
const itemsDB = remote.getGlobal('itemsDB');

class Items extends Component {
    state = {
        items: [],
        isModalOpen: false // New Item Modal
    }

    handleDelete(id) {
        itemsDB.remove({ _id: id }, {}, (err, numRemoved) => {
            this.getItems();
        });
    }

    toggle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleEdit = (id, value) => {
        itemsDB.update({ _id: id }, { item: value }, () => {
            this.getItems();
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
                        const items = [...this.state.items];
                        items[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.setState({ items });
                        this.handleEdit(cellInfo.row._id, e.target.innerHTML);
                    }}
                    dangerouslySetInnerHTML={{
                        __html: this.state.items[cellInfo.index][cellInfo.column.id]
                    }}
                />
                <Button className={classes.deleteButton} close onClick={() => this.handleDelete(cellInfo.row._id)} ></Button>
            </div>
        );
    }

    componentDidMount() {
        this.getItems();
    }

    getItems = () => {
        itemsDB.find({}).sort({ createdAt: -1 }).exec((err, items) => {
            this.setState({ ...this.state, items: items })
        });
    }

    render() {
        return (
            <Container fluid>
                <PageHeading>Items</PageHeading>
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <ReactTable
                            data={this.state.items}
                            columns={[
                                {
                                    Header: "Item",
                                    accessor: "item",
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
                        <Button autoFocus outline className="mt-2" block color="primary" onClick={this.toggle} >New Item</Button>
                        <ItemNew
                            isModalOpen={this.state.isModalOpen}
                            toggle={this.toggle}
                            getItems={this.getItems}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

export default Items;