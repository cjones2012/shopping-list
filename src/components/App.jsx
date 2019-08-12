import React, {Component} from 'react';
import ShoppingLists from './ShoppingLists';
import AddShoppingItemForm from './AddShoppingItemForm';
import { Container, Grid, Segment } from 'semantic-ui-react';

class App extends Component {
    state = {
        stores: [
            { key: 1, text: 'Walmart', value: 1 },
            { key: 2, text: 'Lowes', value: 2 },
            { key: 3, text: 'Aldi', value: 3 }
        ],
        shoppingLists: [
            { store: 1,
              active: true,  
              items: [
                  { name: 'Bread', quantity: 1, isChecked: false },
                  { name: 'Cheese', quantity: 1, isChecked: false },
              ]
            },
            { store: 2,
              active: true,
              items: [
                  { name: 'Nails', quantity: 2, isChecked: false },
                  { name: 'Wood Glue', quantity: 1, isChecked: false },
                ]
              },
            { store: 3,
              active: true,
              items: [
                  { name: 'Milk', quantity: 2, isChecked: false },
                  { name: 'Bacon', quantity: 3, isChecked: false },
                ]
            }
        ],
        shoppingListItem: {
            name: '',
            quantity: 0,
            selectedStore: null
        }
    };

    onItemNameChange = event => {
        let { shoppingListItem } = { ...this.state };
        shoppingListItem.name = event.target.value;        
        this.setState({ shoppingListItem });
    }

    onIncreaseQuantity = event => {
        let { shoppingListItem } = { ...this.state };
        shoppingListItem.quantity++;
        this.setState({ shoppingListItem });
    }

    onDecreaseQuantity = event => {
        let { shoppingListItem } = { ...this.state };
        if (shoppingListItem.quantity > 0) {
            shoppingListItem.quantity--;
            this.setState({ shoppingListItem });
        }
    }

    onQuantityChange = event => {
        let { shoppingListItem } = { ...this.state };
        if (shoppingListItem.quantity < 0) {
            shoppingListItem.quantity = event.target.value * 0;
            this.setState({ shoppingListItem });
        }
    }

    onStoreAdd = (e, { value }) => {
        let { stores, shoppingListItem } = { ...this.state };

        stores.push({ key: stores.length + 1, text: value, value: stores.length + 1 });
        shoppingListItem.selectedStore = stores.length;
              
        this.setState({
            stores,
            shoppingListItem
        });
    };

    onStoreChange = (event, { value }) => {
        let { shoppingListItem } = { ...this.state };
        shoppingListItem.selectedStore = value;
        this.setState({ shoppingListItem });
    };

    handleAccordionClick = (e, titleProps) => {
        let { shoppingLists } = this.state;
        let index = shoppingLists.map(list => {
            return list.store;
        }).indexOf(titleProps.store);
        shoppingLists[index].active = !shoppingLists[index].active;
        
        this.setState({ shoppingLists: shoppingLists });
    }

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
                    }
                }
                if (!itemFound) {
                    shoppingLists[i].items.push({ name: shoppingListItem.name, quantity: shoppingListItem.quantity, isChecked: false });
                }
            }
        }
        if (!storeFound) {
            shoppingLists.push({ store: shoppingListItem.selectedStore, active: true, items: [{ name: shoppingListItem.name, quantity: shoppingListItem.quantity, isChecked: false }]});
        }

        this.setState({ shoppingLists, shoppingListItem: { name: '', quantity: 0, selectedStore: null }})
    }

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
    }

    handleRemoveShoppingListItemSubmit = event => {
        event.preventDefault();
        let { shoppingLists } = { ...this.state };

        for (let i = 0; i < shoppingLists.length; i++) {
            shoppingLists[i].items = shoppingLists[i].items.filter(item => !item.isChecked);
        }
        
        shoppingLists = shoppingLists.filter(prop => prop.items.length > 0);

        this.setState({ shoppingLists });
    }

    render() {
        return (
            <Container>
                <Segment padded>
                    <Grid stackable>
                        <Grid.Column width={6}>
                            <ShoppingLists
                                stores={this.state.stores}
                                shoppingLists={this.state.shoppingLists}
                                handleAccordionClick={this.handleAccordionClick}
                                handleCheck={this.handleCheck}
                                handleRemoveShoppingListItemSubmit={this.handleRemoveShoppingListItemSubmit}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}></Grid.Column>
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