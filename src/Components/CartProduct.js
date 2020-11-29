import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Divider, Item } from 'semantic-ui-react'

export default class CartProduct extends Component {
    render() {
        // console.log(this.props.cartProduct.product)
        return (
                <>
                
            <Item>
                <Item.Image size='tiny' src={this.props.cartProduct.product.image} />

                <Item.Content>
                    <Item.Header as='a'>{this.props.cartProduct.product.name}</Item.Header>
                    <Item.Meta>Description</Item.Meta>
                    <Item.Description> {this.props.cartProduct.product.description}</Item.Description>
                    <Item.Extra>${this.props.cartProduct.product.price * this.props.cartProduct.quantity}</Item.Extra>
                </Item.Content>
            </Item>
            <Divider />
            </>
  
        )
    }
}
