import React, { Component } from 'react';
import { Button, Checkbox, Confirm, Header, Input, Label, Segment, Table } from 'semantic-ui-react';
import api from '../apis/shoppingList';
import { actions } from '../constants';
import AddStoreModal from './AddStoreModal';

class StoreList extends Component {
    state = {
        action: '',
        confirmOpen: false,
        hasChanged: false,
        modalOpen: false,
        newStore: '',
        originalStores: [],
        stores: [],
        storesToUpdate: []
    };

    constructor(props) {
        super(props);
        this.loadStores();
    }

    loadStores = async () => {
        const { originalStores, stores } = { ...this.state };
        const response = await api.get('/stores');

        response.data.sort((a, b) => (a.name > b.name ? 1 : -1));
        for (let i = 0; i < response.data.length; i++) {
            let store = response.data[i];
            originalStores.push({ id: store.id, name: store.name, isChecked: store.isChecked });
            stores.push({ id: store.id, name: store.name, isChecked: store.isChecked });
        }

        this.setState({ originalStores, stores });   
    }
    
    onStoreChange = (event, { store, value }) => {
        const { originalStores } = { ...this.state };
        let { stores, storesToUpdate } = { ...this.state };
        
        const originalStoresIndex = originalStores.findIndex(s => s.id === store.id);
        const storesIndex = stores.findIndex(s => s.id === store.id)
        const storesToUpdateIndex = storesToUpdate.findIndex(s => s.id === store.id)
        
        if (storesIndex >= 0) {
            stores[storesIndex].name = value;
        }

        if (storesToUpdateIndex >= 0) {
            storesToUpdate[storesToUpdateIndex].name = value;
            if (storesToUpdate[storesToUpdateIndex].name === originalStores[originalStoresIndex].name) {
                storesToUpdate = storesToUpdate.filter(s => s.id !== store.id);
            }
        } else {
            storesToUpdate.push({ ...store, name: value });
        }
        
        this.setState({ storesToUpdate, stores });
    }

    handleStoreCheck = (event, { store, checked }) => {
        let { stores } = { ...this.state };
        stores[stores.findIndex(s => s.id === store.id)].isChecked = checked;
        this.setState({ stores });
    }

    toggleConfirm = (action = '') => {
        let { confirmOpen } = this.state;
        confirmOpen = !confirmOpen
        this.setState({ confirmOpen, action: action });
    }

    handleConfirm = event => {
        const { action } = this.state;
        let { originalStores, stores, storesToUpdate } = { ...this.state };
        
        switch (action) {
            case actions.DELETE:
                let storesToDelete = stores.filter(s => s.isChecked);
                for (let i = 0; i < storesToDelete.length; i++) {
                    originalStores = originalStores.filter(s => s.id !== storesToDelete[i].id);
                    stores = stores.filter(s => s.id !== storesToDelete[i].id);
                }

                api.delete('/stores/DeleteStores', { data: storesToDelete }).then(() => {
                    this.setState({ originalStores, stores });    
                });  
                break;
            case actions.SAVE:
                for (let i = 0; i < storesToUpdate.length; i++) {
                    originalStores[originalStores.findIndex(s => s.id === storesToUpdate[i].id)].name = storesToUpdate[i].name;
                }
                
                api.put('/stores/UpdateStores', this.state.storesToUpdate).then(() => {
                    storesToUpdate.length = 0;
                    this.setState({ originalStores, storesToUpdate });
                });
                break;
            default:
                break;
        }

        this.toggleConfirm();
    }

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    onNewStoreChange = event => {
        this.setState({ newStore: event.target.value });
    }

    handleSubmitNewStore = event => {
        const { originalStores, stores } = { ...this.state };
        let index = stores.findIndex(s => s.name === this.state.newStore);

        if (index < 0) {
            api.post('/stores', { name: this.state.newStore }).then(response => {
                stores.push({ id: response.data.id, name: this.state.newStore, isChecked: false });
                originalStores.push({ id: response.data.id, name: this.state.newStore, isChecked: false });
                stores.sort((a, b) => (a.name > b.name ? 1 : -1));
                this.setState({ originalStores, stores, newStore: '' });
                this.toggleModal();
            });
        }
    }

    render() {
        const { stores } = { ...this.state };

        return (
            <Segment padded='very'>
                <Label attached='top'>
                    <Header as='h2'>Stores</Header>
                </Label>
                <Table celled compact definition>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Name</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {stores.map(store => {
                            return (
                                <Table.Row key={store.id}>
                                    <Table.Cell collapsing>
                                        <Checkbox
                                            slider
                                            checked={store.isChecked}
                                            store={store}
                                            onChange={this.handleStoreCheck} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input type='text' onChange={this.onStoreChange} store={store} value={store.name} />
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>
                                <AddStoreModal modalOpen={this.state.modalOpen} newStore={this.state.newStore} toggleModal={this.toggleModal} onNewStoreChange={this.onNewStoreChange} handleSubmitNewStore={this.handleSubmitNewStore} />
                                <Button color='red' size='large' onClick={() => this.toggleConfirm(actions.DELETE)} disabled={stores.filter(store => store.isChecked).length === 0}>
                                    Remove Selected
                                </Button>
                                <Button primary size='large' onClick={() => this.toggleConfirm(actions.SAVE)} disabled={this.state.storesToUpdate.length <= 0}>Save Changes</Button>
                                <Confirm open={this.state.confirmOpen} onConfirm={this.handleConfirm} onCancel={() => this.toggleConfirm()} content='Are you sure you would like to apply these changes?' />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Segment>
        );
    }
}

export default StoreList;