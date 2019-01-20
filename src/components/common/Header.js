import React from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import {headerMenu} from '../../helpers/data/uiConfig';
//Ref : https://getbootstrap.com/docs/4.0/components/navbar/
export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let headerMenus = headerMenu.map(item => <NavItem key={item.name}><NavLink href={item.url}>{item.name}</NavLink></NavItem>);
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            {headerMenus}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}