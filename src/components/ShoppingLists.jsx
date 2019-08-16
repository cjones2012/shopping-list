import React, {Component} from 'react';
import ShoppingList from './ShoppingList';
import { Button, Form, Header, Label, Segment } from 'semantic-ui-react';

class ShoppingLists extends Component {
    render() {
        const {shoppingLists } = this.props;
        
        return (
            <Segment padded='very'>
                <Label attached='top'>
                    <Header as='h2'>Shopping Lists</Header>
                </Label>
                <Form onSubmit={this.props.handleRemoveShoppingListItemSubmit}>
                    {shoppingLists.map(shoppingList => {
                        return (
                            <Form.Field key={shoppingList.store}>
                                <ShoppingList
                                    shoppingList={shoppingList}
                                    handleAccordionClick={this.props.handleAccordionClick}
                                    handleCheck={this.props.handleCheck}
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
}

export default ShoppingLists;