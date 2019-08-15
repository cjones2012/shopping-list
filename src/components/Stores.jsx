import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class Stores extends Component {
    render() {
        return (
            <Grid stackable>
                <Grid.Column width={16}>
                    <div>Stores</div>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Stores;