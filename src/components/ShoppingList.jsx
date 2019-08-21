import React from 'react';
import ShoppingListItem from './ShoppingListItem';
import { Accordion, Icon, AccordionTitle, AccordionContent } from 'semantic-ui-react';

const ShoppingList = props => {  
    const { shoppingList, handleAccordionClick, handleCheck } = props;

    return (
        <Accordion styled>
            <AccordionTitle active={shoppingList.active} store={shoppingList.store} onClick={handleAccordionClick}>
                <Icon name='dropdown' />
                {shoppingList.store}
            </AccordionTitle>
            <AccordionContent active={shoppingList.active}>
                {shoppingList.items.map(item => {
                    return <ShoppingListItem key={item.name} shoppingList={shoppingList} shoppingListItem={item} handleCheck={handleCheck} />;
                })}                    
            </AccordionContent>
        </Accordion>
    );
}

export default ShoppingList;