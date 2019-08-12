import React, {Component} from 'react';
import { Button, Dropdown, Form, Grid, Header, Input, Label, Segment } from 'semantic-ui-react';

class AddShoppingListItemForm extends Component {
    state = {};

    render() {
        const { stores } = this.props;
        const { shoppingListItem } = this.props;
        
        return (
            <Segment padded>
                <Label attached='top'>
                    <Header as='h2'>What do we need?</Header>
                </Label>
                <Form onSubmit={this.props.handleAddShoppingListItemSubmit}>
                    <Form.Field>
                        <label>Item</label>
                        <Input type="text" value={shoppingListItem.name} onChange={this.props.onItemNameChange} name="item" placeholder="Enter item" />
                    </Form.Field>
                    <Form.Field>
                        <label>Store</label>
                        <Dropdown placeholder="Select..." search selection allowAdditions options={stores} value={shoppingListItem.selectedStore} onAddItem={this.props.onStoreAdd} onChange={this.props.onStoreChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Quantity</label>
                    </Form.Field>
                    <Form.Field>
                        <Grid>
                            <Grid.Column width={3}>
                                <Button type="button" size="mini" icon="minus" onClick={this.props.onDecreaseQuantity} fluid></Button>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Input type="text" size="mini" value={shoppingListItem.quantity} onChange={this.props.onQuantityChange} fluid />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Button type="button" size="mini" icon="plus" onClick={this.props.onIncreaseQuantity} fluid></Button>
                            </Grid.Column>
                        </Grid>
                    </Form.Field>
                    <Form.Field>
                        <Button type="submit" primary fluid disabled={!shoppingListItem.name || shoppingListItem.selectedStore <= 0 || shoppingListItem.quantity <= 0}>Add</Button>
                    </Form.Field>
                </Form>
            </Segment>
        );
    }
}

export default AddShoppingListItemForm;