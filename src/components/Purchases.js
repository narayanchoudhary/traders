import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import PageHeading from "./PageHeading";
import ReactTable from "react-table";
import PurchaseNew from "./PurchaseNew";

class Purchases extends Component {

    state = {
        isNewPurchaseModalOpen: false,
    }

    toggleNewPurchaseModal = () => {
        this.setState({
            isNewPurchaseModalOpen: !this.state.isNewPurchaseModalOpen,
        });
    }

    render() {
        return (
            <Container fluid>
                <PageHeading>Purchases</PageHeading>
                <div className="d-flex justify-content-center align-parties-center">
                    <div>
                        <ReactTable
                            data={[]}
                            columns={[
                                {
                                    Header: "SNumber",
                                    accessor: "SNumber"
                                },
                                {
                                    Header: "Date",
                                    accessor: "date"
                                },
                                {
                                    Header: "Address",
                                    accessor: "address"
                                },
                                {
                                    Header: "Party",
                                    accessor: "party",
                                },
                                {
                                    Header: "Store",
                                    accessor: "store",
                                },
                                {
                                    Header: "Amount",
                                    accessor: "amount",
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
                        <Button autoFocus outline className="mt-2" block color="primary" onClick={this.toggleNewPurchaseModal} >New Purchase</Button>
                        <PurchaseNew
                            isModalOpen={this.state.isNewPurchaseModalOpen}
                            toggle={this.toggleNewPurchaseModal}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

export default Purchases;