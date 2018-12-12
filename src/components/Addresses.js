import React, { Component } from 'react';
import ReactTable from "react-table";
import { Container, Button } from "reactstrap";
import PageHeading from './PageHeading';
import classes from '../css/Addresses.module.css';

class Addresses extends Component {
    state = {
        data: [
            { name: "Dharawara" },
            { name: "Dhannad" },
            { name: "Machal" },
            { name: "Orangpura" },
            { name: "Sirpur" },
            { name: "Xavier" },
            { name: "Zameen" },
        ]
    }

    renderEditable = (cellInfo) => {
        return (
            <div

                className={classes.renderEditable}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    render() {
        return (
            <Container fluid>
                <PageHeading>Addresses</PageHeading>
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <ReactTable
                            data={this.state.data}
                            columns={[
                                {
                                    Header: "Name",
                                    accessor: "name",
                                    Cell: this.renderEditable,
                                    filterable: true,
                                    filterMethod: (filter, row) => {
                                        let cell = row[filter.id].toLowerCase();
                                        let filterValue = filter.value.toLowerCase();
                                        return cell.startsWith(filterValue) || cell.endsWith(filterValue);
                                    }
                                },
                            ]}
                            style={{
                                height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                        <Button outline className="mt-2" block color="primary" >Add</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Addresses;