import React, { Component } from 'react'
import '../App.css';
import { Item , Button, Icon} from 'semantic-ui-react'

export default class ProductInfo extends Component {
    render() {
        console.log("Clicked product:", this.props.product)
        return (
            <>
            <Item>
                <Item.Image size="large" src='https://react.semantic-ui.com/images/wireframe/image.png' />

                <Item.Content>
                    <Item.Header as='a'>Watchmen</Item.Header>
                    <Item.Meta>
                    <span className='cinema'>IFC</span>
                    </Item.Meta>
                    <Item.Description>{"paragraph"}</Item.Description>
                    <Item.Extra>
                    <Button primary floated='right'>
                        Buy tickets
                        <Icon name='right chevron' />
                    </Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
            </>
        )
    }
}
