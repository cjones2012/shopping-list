import React, { Component } from 'react';
import { Checkbox, Grid, Input, Segment } from 'semantic-ui-react';

class StoreListItem extends Component {   
    render() {
        const { store } = this.props;

        return (
            <Grid.Column>
                <Segment padded>
                    <Grid verticalAlign='middle'>
                        <Grid.Column>
                            <Checkbox 
                                checked={store.isChecked}
                                store={store}
                                onChange={this.props.handleStoreCheck} />
                        </Grid.Column>
                        <Grid.Column>
                            <Input type='text' onChange={this.props.onStoreChange} store={store} value={store.name} />
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Grid.Column>
        );
    }
}

export default StoreListItem;