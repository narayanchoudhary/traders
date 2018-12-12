import React, { Component } from 'react';
import ReactTable from "react-table";
import { Container } from "reactstrap";
import PageHeading from './PageHeading';

class Addresses extends Component {
    render() {
        return (
            <Container fluid>
                <PageHeading>Addresses</PageHeading>
                <ReactTable
                    data={[
                        {name: "Dharawara"},
                        {name: "Dhannad"},
                        {name: "Machal"},
                        {name: "Orangpura"},
                        {name: "Sirpur"},
                        {name: "Xavier"},
                        {name: "Zameen"},
                    ]}
                    columns={[
                        {
                            Header: "Name",
                            accessor: "name",
                        },
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </Container>
        );
    }
}

export default Addresses;