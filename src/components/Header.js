import React, { Fragment } from 'react';
import { NavLink as RRNavLink, Redirect } from 'react-router-dom';
import * as classes from '../css/Header.module.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            redirectToHome: false,
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    redirectToHome = (e) => {
        e.stopPropagation();
        this.setState({ redirectToHome: true });
    }

    render() {
        return (
            <Fragment>
                {this.state.redirectToHome && <Redirect to="/" />}
                <Navbar dark fixed="top" color="primary" expand="md" className={classes.header}>
                    <NavbarBrand tag={RRNavLink} to="/">
                        Hariom Traders
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/purchases">Purchase</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/sales">Sales</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Master
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag={RRNavLink} to="/masters/addresses">
                                        Address
                                    </DropdownItem>
                                    <DropdownItem tag={RRNavLink} to="/masters/parties">
                                        Party
                                    </DropdownItem>
                                    <DropdownItem tag={RRNavLink} to="/masters/items">
                                        Item
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Fragment>
        );
    }
}