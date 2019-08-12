import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';

const ShoppingListItem = props => {
    const { shoppingList } = props;
    const { shoppingListItem } = props;
    
    return (
        <Form.Field inline>
            <Checkbox label={shoppingListItem.name} checked={shoppingListItem.isChecked} onChange={() => props.handleCheck(shoppingList.store, shoppingListItem)} />
            <span>({shoppingListItem.quantity})</span>
        </Form.Field>
    )
}

export default ShoppingListItem;