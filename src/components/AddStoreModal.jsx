import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const AddStoreModal = props => {     
    const { modalOpen, toggleModal, newStoreInputRef, newStore, onKeyDown, onNewStoreChange, handleSubmitNewStore} = props;
    
    return (
        <Modal dimmer='blurring' size='mini' open={modalOpen}>
            <Modal.Header>Add Store</Modal.Header>
            <Modal.Content>
            <div className="ui input">
                <input type='text' placeholder='Enter store' value={newStore} ref={newStoreInputRef} onKeyDown={onKeyDown} onChange={onNewStoreChange} />
            </div>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={toggleModal}>Close</Button>
                <Button type='submit' primary disabled={newStore === ''} onClick={handleSubmitNewStore}>Submit</Button>    
            </Modal.Actions>
        </Modal>
    );
}

export default AddStoreModal;