import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import api from '../apis/shoppingList';
import AddShoppingItemForm from './AddShoppingItemForm';
import ShoppingLists from './ShoppingLists';

export default class Home extends Component {
    state = {
        stores: [],
        shoppingLists: [],
        shoppingListItem: {
            name: '',
            quantity: 0,
            selectedStore: null
        }
    };

    constructor(props) {
        super(props);
        this.loadStores();
        this.loadShoppingLists();
    }

    loadStores = async () => {
        const { stores } = { ...this.state };
        const response = await api.get('/stores');

        response.data.sort((a, b) => (a.name > b.name ? 1 : -1));
        for (let i = 0; i < response.data.length; i++) {
            let store = response.data[i];
            stores.push({ key: store.id, text: store.name, value: store.name });
        }

        this.setState({ stores });
    };

    loadShoppingLists = async () => {
        const { shoppingLists } = { ...this.state };
        const response = await api.get('/shopping-lists');

        response.data.sort((a, b) => (a.store > b.store ? 1 : -1));
        for (let i = 0; i < response.data.length; i++) {
            let shoppingList = response.data[i];
            shoppingLists.push({
                id: shoppingList.id,
                active: shoppingList.active,
                store: shoppingList.store,
                items: shoppingList.items
            });
        }

        this.setState({ shoppingLists });
    };

    onItemNameChange = event => {
        let { shoppingListItem } = { ...this.state };
        shoppingListItem.name = event.target.value;
        this.setState({ shoppingListItem });
    };

    onIncreaseQuantity = event => {
        let { shoppingListItem } = { ...this.state };
        shoppingListItem.quantity++;
        this.setState({ shoppingListItem });
    };

    onDecreaseQuantity = event => {
        let { shoppingListItem } = { ...this.state };
        if (shoppingListItem.quantity > 0) {
            shoppingListItem.quantity--;
            this.setState({ shoppingListItem });
        }
    };

    onQuantityChange = event => {
        let { shoppingListItem } = { ...this.state };
        if (shoppingListItem.quantity < 0) {
            shoppingListItem.quantity = event.target.value * 0;
            this.setState({ shoppingListItem });
        }
    };

    onStoreAdd = (e, { value }) => {
        let { stores, shoppingListItem } = { ...this.state };
        
        api.post('/stores', { name: value }).then(response => {
            shoppingListItem.selectedStore = value;
            stores.push({ key: response.data.id, text: value, value: value });
            stores.sort((a, b) => (a.text > b.text ? 1 : -1));
            this.setState({
                stores,
                shoppingListItem
            });
        });
    };

    onStoreChange = (event, { value }) => {
        let { shoppingListItem, stores } = { ...this.state };
        for (let i = 0; i < stores.length; i++) {
            if (stores[i].value === value) {
                shoppingListItem.selectedStore = value;
                this.setState({ shoppingListItem });
            }
        }
    };

    handleAccordionClick = (e, titleProps) => {
        let { shoppingLists } = this.state;
        let index = shoppingLists
            .map(list => {
                return list.store;
            })
            .indexOf(titleProps.store);
        shoppingLists[index].active = !shoppingLists[index].active;

        this.setState({ shoppingLists: shoppingLists });
    };

    handleAddShoppingListItemSubmit = event => {
        event.preventDefault();
        let { shoppingLists, shoppingListItem } = { ...this.state };
        let storeFound = false;
        let itemFound = false;

        for (let i = 0; i < shoppingLists.length; i++) {
            if (shoppingLists[i].store === shoppingListItem.selectedStore) {
                storeFound = true;
                for (let k = 0; k < shoppingLists[i].items.length && !itemFound; k++) {
                    if (shoppingLists[i].items[k].name === shoppingListItem.name) {
                        itemFound = true;
                        shoppingLists[i].items[k].quantity += shoppingListItem.quantity;
                        api.put('/shopping-lists', shoppingLists[i]).then(response => {
                            this.setState({ shoppingLists, shoppingListItem: { name: '', quantity: 0, selectedStore: null } });
                        });
                    }
                }
                if (!itemFound) {
                    shoppingLists[i].items.push({
                        id: shoppingListItem.id,
                        name: shoppingListItem.name,
                        quantity: shoppingListItem.quantity,
                        isChecked: false
                    });

                    api.put('/shopping-lists', shoppingLists[i]).then(response => {
                        this.setState({ shoppingLists, shoppingListItem: { name: '', quantity: 0, selectedStore: null } });
                    });
                }
            }
        }
        if (!storeFound) {
            var newShoppingList = {
                store: shoppingListItem.selectedStore,
                active: true,
                items: [{ name: shoppingListItem.name, quantity: shoppingListItem.quantity, isChecked: false }]
            };

            api.post('/shopping-lists', newShoppingList).then(response => {
                shoppingLists.push({ ...newShoppingList, id: response.data.id })
                shoppingLists.sort((a, b) => (a.store > b.store ? 1 : -1));
                this.setState({ shoppingLists, shoppingListItem: { name: '', quantity: 0, selectedStore: null } });
            });
        }
    };

    handleCheck = (store, shoppingListItem) => {
        let { shoppingLists } = { ...this.state };
        for (let i = 0; i < shoppingLists.length; i++) {
            if (shoppingLists[i].store === store) {
                for (let k = 0; k < shoppingLists[i].items.length; k++) {
                    if (shoppingLists[i].items[k].name === shoppingListItem.name) {
                        shoppingLists[i].items[k].isChecked = !shoppingLists[i].items[k].isChecked;
                    }
                }
            }
        }

        this.setState({ shoppingLists });
    };

    handleRemoveShoppingListItemSubmit = event => {
        event.preventDefault();
        let { shoppingLists } = { ...this.state };
        let shoppingListsToUpdate = [];
        let shoppingListsToDelete = [];

        for (let i = 0; i < shoppingLists.length; i++) {
            var checkedItems = shoppingLists[i].items.filter(item => item.isChecked);
            var unCheckedItems = shoppingLists[i].items.filter(item => !item.isChecked);
            
            if (checkedItems.length === shoppingLists[i].items.length) {
                shoppingLists[i].items = unCheckedItems;
                shoppingListsToDelete.push(shoppingLists[i]);
            }
            else if (unCheckedItems.length !== shoppingLists[i].items.length) {
                shoppingLists[i].items = unCheckedItems;
                shoppingListsToUpdate.push(shoppingLists[i]);
            }
        }
        shoppingLists = shoppingLists.filter(prop => prop.items.length !== 0);
        
        if (shoppingListsToUpdate.length > 0) {
            api.put('/shopping-lists/UpdateShoppingLists', shoppingListsToUpdate).then(response => {
                this.setState({ shoppingLists });
            });
        }

        if (shoppingListsToDelete.length > 0) {
            api.delete('/shopping-lists/DeleteShoppingLists', { data: shoppingListsToDelete }).then(response => {
                this.setState({ shoppingLists });
            });
        }
    };

    render() {
        return (
            <Grid stackable>
                <Grid.Column width={6}>
                    <ShoppingLists
                        shoppingLists={this.state.shoppingLists}
                        handleAccordionClick={this.handleAccordionClick}
                        handleCheck={this.handleCheck}
                        handleRemoveShoppingListItemSubmit={this.handleRemoveShoppingListItemSubmit}
                    />
                </Grid.Column>
                <Grid.Column width={4} />
                <Grid.Column width={6}>
                    <AddShoppingItemForm
                        stores={this.state.stores}
                        shoppingListItem={this.state.shoppingListItem}
                        onItemNameChange={this.onItemNameChange}
                        onStoreAdd={this.onStoreAdd}
                        onStoreChange={this.onStoreChange}
                        onIncreaseQuantity={this.onIncreaseQuantity}
                        onDecreaseQuantity={this.onDecreaseQuantity}
                        onQuantityChange={this.onQuantityChange}
                        handleAddShoppingListItemSubmit={this.handleAddShoppingListItemSubmit}
                    />
                </Grid.Column>
            </Grid>
        );
    }
}