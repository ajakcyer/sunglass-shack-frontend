import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Divider, Item } from 'semantic-ui-react'

export default class CartProduct extends Component {

    state = {
        quantity: this.props.cartProduct.quantity
    }

    onChangeHandler = (e) => {
        this.setState({ quantity: e.target.value}, () => {
            this.props.updateQuantityHandler(this.props.cartProduct, this.state.quantity)
        })
    }

    // increaseQuantity = () => {
    //     console.log("increased")
    // }

    // decreaseQuantity = () => {
    //     console.log("decreased")
    // }

    deleteProduct = () => {
        console.log("deleted")
    }

    render() {
        // console.log(this.state.quantity)
        
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
                <div className= "quantity-button">
                    <input type="number" style={{ "width": "40px"}} value={this.state.quantity} onChange={this.onChangeHandler} /> 
                    {/* <button onClick={this.increaseQuantity}>+</button>
                    <button onClick={this.decreaseQuantity}>-</button> */}
                </div>
                <button  onClick={this.deleteProduct} >Remove</button>
            </Item>
            <Divider />
            </>
  
        )
    }
}
