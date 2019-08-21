import React from 'react';
import ShoppingList from './ShoppingList';
import { Button, Form, Header, Label, Segment } from 'semantic-ui-react';

const ShoppingLists = props => {
    const {shoppingLists, handleRemoveShoppingListItemSubmit, handleAccordionClick, handleCheck } = props;
    
    return (
        <Segment padded='very'>
            <Label attached='top'>
                <Header as='h2'>Shopping Lists</Header>
            </Label>
            <Form onSubmit={handleRemoveShoppingListItemSubmit}>
                {shoppingLists.map(shoppingList => {
                    return (
                        <Form.Field key={shoppingList.store}>
                            <ShoppingList
                                shoppingList={shoppingList}
                                handleAccordionClick={handleAccordionClick}
                                handleCheck={handleCheck}
                            />
                        </Form.Field>
                    );
                })}
                
                {shoppingLists.length > 0 &&
                    <Form.Field>
                        <Button type='submit' primary fluid>Remove Selected</Button>
                    </Form.Field>
                }
            </Form>
        </Segment>
    );
}

export default ShoppingLists;