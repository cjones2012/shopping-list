import React from 'react';
import { Checkbox, Input, Table } from 'semantic-ui-react';

const StoreListItem = props => {
    const { store, onStoreChange, handleStoreCheck } = props;
    
    return (
        <Table.Row key={store.id}>
            <Table.Cell collapsing>
                <Checkbox
                    slider
                    checked={store.isChecked}
                    store={store}
                    onChange={handleStoreCheck} />
            </Table.Cell>
            <Table.Cell>
                <Input type='text' onChange={onStoreChange} store={store} value={store.name} />
            </Table.Cell>
        </Table.Row>
    );
};

export default StoreListItem;