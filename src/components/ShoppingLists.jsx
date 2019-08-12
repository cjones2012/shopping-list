import React, {Component} from 'react';
import ShoppingList from './ShoppingList';
import { Button, Form, Header, Label, Segment } from 'semantic-ui-react';

class ShoppingLists extends Component {
    render() {
        const { stores } = this.props;
        const {shoppingLists } = this.props;
        
        return (
            <Segment padded>
                <Label attached='top'>
                    <Header as='h2'>Shopping Lists</Header>
                </Label>
                <Form>
                    {shoppingLists.map(shoppingList => {
                        return (
                            <Form.Field key={shoppingList.store}>
                                <ShoppingList
                                    shoppingList={shoppingList}
                                    stores={stores}
                                    handleAccordionClick={this.props.handleAccordionClick}
                                    handleCheck={this.props.handleCheck}
                                />
                            </Form.Field>
                        );
                    })}
                    
                    {shoppingLists.length > 0 &&
                        <Form.Field>
                            <Button type="submit" primary fluid onClick={this.props.handleRemoveShoppingListItemSubmit}>Remove Selected</Button>
                        </Form.Field>
                    }
                </Form>
            </Segment>
        );
    }
}

export default ShoppingLists;