import React, { Component } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import api from '../apis/shoppingList';
import ShoppingLists from './ShoppingLists';
import AddShoppingItemForm from './AddShoppingItemForm';

class App extends Component {
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
        const response = await api.get('/api/stores');

        response.data.sort((a, b) => (a.name > b.name ? 1 : -1));
        for (let i = 0; i < response.data.length; i++) {
            let store = response.data[i];
            stores.push({ key: store.id, text: store.name, value: store.name });
        }

        this.setState({ stores });
    };

    loadShoppingLists = async () => {
        const { shoppingLists } = { ...this.state };
        const response = await api.get('/api/shopping-lists');

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

        api.post('/api/stores', { name: value }).then(response => {
            stores.push({ key: response.data.id, text: value, value: value });
            shoppingListItem.selectedStore = value;
            this.setState({
                stores,
                shoppingListItem
            });
        });
    };

    onStoreChange = (event, { value }) => {
        let { shoppingListItem } = { ...this.state };
        shoppingListItem.selectedStore = value;
        this.setState({ shoppingListItem });
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
                        api.put('/api/shopping-lists', shoppingLists[i]).then(response => {
                            console.log(response);
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

                    api.put('/api/shopping-lists', shoppingLists[i]).then(response => {
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

            api.post('/api/shopping-lists', newShoppingList).then(response => {
                shoppingLists.push({ ...newShoppingList, id: response.data.id });
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

        for (let i = 0; i < shoppingLists.length; i++) {
            shoppingLists[i].items = shoppingLists[i].items.filter(item => !item.isChecked);
        }

        shoppingLists = shoppingLists.filter(prop => prop.items.length > 0);

        this.setState({ shoppingLists });
    };

    render() {
        return (
            <Container>
                <Segment padded>
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
                </Segment>
            </Container>
        );
    }
}

export default App;
