import React, {Component} from 'react';
import ShoppingListItem from './ShoppingListItem';
import { Accordion, Icon, AccordionTitle, AccordionContent } from 'semantic-ui-react';

class ShoppingList extends Component {  
    render() {
        const { shoppingList } = this.props;
        const { stores } = this.props;
        
        return (
            <Accordion styled>
                <AccordionTitle active={shoppingList.active} store={shoppingList.store} onClick={this.props.handleAccordionClick}>
                    <Icon name='dropdown' />
                    {stores[shoppingList.store-1].text}
                </AccordionTitle>
                <AccordionContent active={shoppingList.active}>
                    {shoppingList.items.map(item => {
                        return <ShoppingListItem key={item.name} shoppingList={shoppingList} shoppingListItem={item} handleCheck={this.props.handleCheck} />;
                    })}                    
                </AccordionContent>
            </Accordion>
        );
    }
}

export default ShoppingList;