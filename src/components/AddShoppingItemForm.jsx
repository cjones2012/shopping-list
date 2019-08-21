import React from 'react';
import { Button, Dropdown, Form, Grid, Header, Input, Label, Segment } from 'semantic-ui-react';

const AddShoppingListItemForm = props => {
    const { stores, shoppingListItem, handleAddShoppingListItemSubmit, onItemNameChange, 
        onStoreAdd, onStoreChange, onDecreaseQuantity, onIncreaseQuantity, onQuantityChange } = this.props;
    const disableSubmit = !shoppingListItem.name || shoppingListItem.selectedStore <= 0 || shoppingListItem.quantity <= 0;
    
    return (
        <Segment padded='very'>
            <Label attached="top">
                <Header as="h2">What do we need?</Header>
            </Label>
            <Form onSubmit={handleAddShoppingListItemSubmit}>
                <Form.Field>
                    <label>Item</label>
                    <Input type='text' name='item' placeholder='Enter item' 
                        value={shoppingListItem.name} 
                        onChange={onItemNameChange} />
                </Form.Field>
                <Form.Field>
                    <label>Store</label>
                    <Dropdown placeholder='Select...' search selection allowAdditions 
                        selectOnBlur={false} 
                        options={stores} 
                        value={shoppingListItem.selectedStore} 
                        onAddItem={onStoreAdd} 
                        onChange={onStoreChange} />
                </Form.Field>
                <Form.Field>
                    <label>Quantity</label>
                </Form.Field>
                <Form.Field>
                    <Grid>
                        <Grid.Column width={3}>
                            <Button type='button' size='mini' icon='minus' fluid onClick={onDecreaseQuantity} />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Input type='text' size='mini' fluid
                                value={shoppingListItem.quantity} 
                                onChange={onQuantityChange}  />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button type='button' size='mini' icon='plus' onClick={onIncreaseQuantity} fluid />
                        </Grid.Column>
                    </Grid>
                </Form.Field>
                <Form.Field>
                    <Button type='submit' primary fluid disabled={disableSubmit}>Add</Button>
                </Form.Field>
            </Form>
        </Segment>
    );
}

export default AddShoppingListItemForm;