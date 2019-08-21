import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { pages } from '../constants';

const Navbar = props => {
    const { activeItem, handleItemClick } = props;
        
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item name={pages.HOME} active={activeItem === pages.HOME} onClick={handleItemClick} />
                <Menu.Item name={pages.STORES} active={activeItem === pages.STORES} onClick={handleItemClick} />
            </Container>
        </Menu>
    );
};

export default Navbar;