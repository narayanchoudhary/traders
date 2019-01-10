import React, { Component } from 'react';
import ReactTable from "react-table";
import { Container, Button } from "reactstrap";
import PageHeading from './PageHeading';
import classes from '../css/Hammals.module.css';
import { toggleNewHammalModal, fetchHammals } from '../store/actions/Hammals';
import { connect } from 'react-redux';
const remote = window.require("electron").remote;
const hammalsDB = remote.getGlobal('hammalsDB');

class Hammals extends Component {

    handleDelete(id) {
        hammalsDB.remove({ _id: id }, {}, (err, numRemoved) => {
            this.props.fetchHammals();
        });
    }

    toggle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleEdit = (id, value) => {
        hammalsDB.update({ _id: id }, { hammalName: value }, () => {
            this.props.fetchHammals();
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
                        __html: this.props.hammals[cellInfo.index][cellInfo.column.id]
                    }}
                />
                <Button className={classes.deleteButton} close onClick={() => this.handleDelete(cellInfo.row._id)} ></Button>
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchHammals();
    }

    render() {
        return (
            <Container fluid>
                <PageHeading>Hammals</PageHeading>
                <div className="d-flex justify-content-center align-hammals-center">
                    <div>
                        <ReactTable
                            data={this.props.hammals}
                            columns={[
                                {
                                    Header: "Hammal",
                                    accessor: "hammalName",
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
                        <Button autoFocus outline className="mt-2" block color="primary" onClick={this.props.toggleNewHammalModal} >New Hammal</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        hammals: state.hammal.hammals,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNewHammalModal: () => dispatch(toggleNewHammalModal),
        fetchHammals: () => dispatch(fetchHammals)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hammals);