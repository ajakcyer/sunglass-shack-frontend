import React from 'react'
import CartProduct from '../Components/CartProduct'
import 'semantic-ui-css/semantic.min.css'
import { Item } from 'semantic-ui-react'


class Cart extends React.Component {

    cartTotalPrice = () =>{
        return this.props.cartItems.map(cartP =>
            ({
                price: cartP.product.price,
                quantity: cartP.quantity})
                ).reduce((a, b)=> a + (b.price * b.quantity), 0)
    }

    cartQuantity = () => {
        return this.props.cartItems.map(cartP => cartP.quantity).reduce((a, b)=> a + b, 0)
    }

    renderCartProducts = () => {
        return this.props.cartItems.map(cartObj => <CartProduct key={cartObj.id} cartProduct={cartObj} updateQuantityHandler={this.props.updateQuantityHandler} />)
    }

    render (){
        
        return(
            <>
            <Item.Group>
                {this.renderCartProducts()}
            </Item.Group>
                <h1>Total ({this.cartQuantity()} items): ${this.cartTotalPrice()}</h1>
            </>
        ) 
    }
}

export default Cart;