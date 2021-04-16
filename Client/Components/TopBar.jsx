import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import "../style.css"


class TopBar extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);

        this.state = {
            isOpen: false
        };
    }

    handleSignOut() {
        this.props.history.push("/")
    }


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }



    render() {

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/homepage">
                        <img className="logoImg" src={require("./images/MainLogo.png")} alt="Main Logo" />
                    </NavbarBrand>

                    <NavbarBrand href="/homepage">
                        <img className="profileImg" src={require("./images/malePic.png")} alt="Male Profile Picture" />
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>

                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {this.props.user.firstName}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Current Reservations
                                    </DropdownItem>
                                    <DropdownItem onClick={this.handleSignOut}>
                                        Sign Out
                                    </DropdownItem>

                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default TopBar;