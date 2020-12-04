import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Divider, Item, Button} from 'semantic-ui-react'

export default class CartProduct extends Component {

    state = {
        quantity: this.props.cartProduct.quantity
    }

    onChangeHandler = (e) => {
        if(e.target.value >= 1 && e.target.value <= 4){
            this.setState({ quantity: e.target.value}, () => {
                this.props.updateQuantityHandler(this.props.cartProduct, this.state.quantity)
            })
        }else if (e.target.value < 1){
            alert("Must have at least 1, or delete from cart")
        }else if (e.target.value > 4){
            alert("Sorry, no more than 4 per customer!")
        }
    }

    deleteProduct = () => {
        this.props.deleteCartProductHandler(this.props.cartProduct)
    }

    render() { 
        return (
                <>
                    <Item>
                        <Item.Image size='tiny' src={this.props.cartProduct.product.image} />
                        <Item.Content>
                            <Item.Header as='a'>{this.props.cartProduct.product.name}</Item.Header>
                            <Item.Description> {this.props.cartProduct.product.description}</Item.Description>
                            <Item.Extra>Price: ${this.props.cartProduct.product.price}</Item.Extra>
                        </Item.Content>
                        <div className= "quantity-button">
                            <label htmlFor="quantity">Quantity: </label>
                            <input type="number" name="quantity" style={{ "width": "40px"}} value={this.state.quantity} onChange={this.onChangeHandler} /> 
                            <br></br>
                            <br></br>
                        <Button  onClick={this.deleteProduct} color="red" floated='right'>Remove</Button>
                        </div>
                    </Item>
                    <Divider />
                </>
        )
    }
}
