import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';

const ShoppingListItem = props => {
    const { shoppingList, shoppingListItem, handleCheck } = props;
    
    return (
        <Form.Field inline>
            <Checkbox label={shoppingListItem.name} checked={shoppingListItem.isChecked} onChange={() => handleCheck(shoppingList.store, shoppingListItem)} />
            <span>({shoppingListItem.quantity})</span>
        </Form.Field>
    )
}

export default ShoppingListItem;