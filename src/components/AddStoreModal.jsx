import React, { Component } from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';

class AddStoreModal extends Component { 
    render() {
        return (
            <>
                <Button primary floated='right' size='large' onClick={this.props.toggleModal}>Add Store</Button>
                <Modal dimmer='blurring' size='mini' open={this.props.modalOpen}>
                    <Modal.Header>Add Store</Modal.Header>
                    <Modal.Content>
                        <Input type='text' placeholder='Enter store' value={this.props.newStore} onChange={this.props.onNewStoreChange} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.toggleModal}>Close</Button>
                        <Button primary disabled={this.props.newStore === ''} onClick={this.props.handleSubmitNewStore}>Submit</Button>
                    </Modal.Actions>
                </Modal>
            </>
        );
    }
}

export default AddStoreModal;