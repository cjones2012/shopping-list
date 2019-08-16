import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import styles from './ShoppingLists.module.css';
import { pages } from '../constants';
import Home from './Home';
import Navbar from './Navbar';
import StoreList from './StoreList';

class App extends Component {
    state = {
        activeItem: pages.STORES
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    render() {
        var { activeItem } = this.state;
        var content = activeItem === pages.HOME ? <Home /> : <StoreList />;
        return (
            <>
                <Navbar activeItem handleItemClick={this.handleItemClick} />
                <Container className={styles.mainContainer}>
                    {content}
                </Container>
            </>
        );
    }
}

export default App;
