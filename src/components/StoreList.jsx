import React, { Component } from 'react';
import { Button, Confirm, Grid, Header, Label, Segment } from 'semantic-ui-react';
import api from '../apis/shoppingList';
import StoreListItem from './StoreListItem';

class StoreList extends Component {
    state = {
        confirmOpen: false,
        stores: []
    };

    constructor(props) {
        super(props);
        this.loadStores();
    }

    loadStores = async () => {
        const { stores } = { ...this.state };
        const response = await api.get('/stores');

        response.data.sort((a, b) => (a.name > b.name ? 1 : -1));
        for (let i = 0; i < response.data.length; i++) {
            let store = response.data[i];
            stores.push({ id: store.id, name: store.name, isChecked: store.isChecked });
        }

        this.setState({ stores });   
    }
    
    onStoreChange = (event, { store }) => {
        let { stores } = this.state;
        stores[stores.findIndex(s => s.id === store.id)].name = store.name;
        this.setState({ stores });
    }

    handleStoreCheck = (event, { store }) => {
        let { stores } = this.state;
        stores[stores.findIndex(s => s.id === store.id)].isChecked = !store.isChecked;
        this.setState({ stores });
    }

    handleConfirm = event => {
        
        this.toggleConfirm();
    }

    toggleConfirm = () => {
        let { confirmOpen } = this.state;
        confirmOpen = !confirmOpen
        this.setState({ confirmOpen });
    }

    render() {
        const { stores } = this.state;        
        let row = 1;
        let storeGrid = [];
        let tempStoreRow = [];

        for (let i = 1; i <= stores.length; i++) {
            tempStoreRow.push(stores[i-1]);
            if (i % 3 === 0 || i === stores.length) {
                storeGrid.push({ storeRow: row++, storeColumns: tempStoreRow });
                tempStoreRow = [];
            }
        }

        return (
            <Segment padded='very'>
                <Label attached='top'>
                    <Header as='h2'>Stores</Header>
                </Label>
                <Grid columns='three' stackable>
                    {storeGrid.map(storeRow => {
                        return (
                            <Grid.Row key={storeRow.storeRow}>
                                {storeRow.storeColumns.map(store => {
                                    return <StoreListItem key={store.key} store={store} handleStoreCheck={this.handleStoreCheck} />
                                })}
                            </Grid.Row>
                        );
                    })}
                    
                    {stores.length > 0 && 
                        <Grid.Row>
                            <Grid.Column>
                                <Button  color='red' size='big' onClick={this.toggleConfirm} disabled={stores.filter(store => store.isChecked).length === 0}>
                                    Remove Selected
                                </Button>
                                <Confirm open={this.state.confirmOpen} onConfirm={this.handleConfirm} onCancel={this.toggleConfirm} />
                            </Grid.Column>
                            <Grid.Column />
                            <Grid.Column>
                                <Button primary size='big' floated='right'>Save Changes</Button>
                            </Grid.Column>
                        </Grid.Row>
                    }
                </Grid>
            </Segment>
        );
    }
}

export default StoreList;