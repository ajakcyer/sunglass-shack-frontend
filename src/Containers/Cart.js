import React from 'react'
import CartProduct from '../Components/CartProduct'
import 'semantic-ui-css/semantic.min.css'
import { Item } from 'semantic-ui-react'


class Cart extends React.Component {

    renderCartProducts = () => {
        return this.props.cartItems.map(cartObj => <CartProduct key={cartObj.id} cartProduct={cartObj} updateQuantityHandler={this.props.updateQuantityHandler} />)
    }

    render (){
        
        return(
            <>
            <Item.Group>
                {this.renderCartProducts()}
            </Item.Group>
            
            </>
        ) 
    }
}

export default Cart;