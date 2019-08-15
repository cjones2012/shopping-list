import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { pages } from '../constants';

class Navbar extends Component {
    render() {
        const { activeItem } = this.props;
        
        return (
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item name={pages.HOME} active={activeItem === pages.HOME} onClick={this.props.handleItemClick} />
                    <Menu.Item name={pages.STORES} active={activeItem === pages.STORES} onClick={this.props.handleItemClick} />
                </Container>
            </Menu>
        );
    }
}

export default Navbar;