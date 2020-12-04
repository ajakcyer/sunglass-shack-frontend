import React from 'react'
import CartProduct from '../Components/CartProduct'
import 'semantic-ui-css/semantic.min.css'
import { Item, Button} from 'semantic-ui-react'
import { Redirect, Route, Switch, NavLink} from 'react-router-dom'
import Checkout from '../Components/Checkout'


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
        return this.props.cartItems.map(cartObj => <CartProduct key={cartObj.id} cartProduct={cartObj} updateQuantityHandler={this.props.updateQuantityHandler}  deleteCartProductHandler={this.props.deleteCartProductHandler} />)
    }

    render (){
        
        return(
            <>
                <Switch>
                    <Route path="/cart/checkout" render={() => {
                        return (
                            <>
                                {localStorage.getItem('token') ?  
                                    <>
                                        <Checkout current_user={this.props.current_user}checkoutHandler={this.props.checkoutHandler} cartItems={this.props.cartItems} updatedUserInfoCheckout={this.props.updatedUserInfoCheckout}/>
                                    </> 
                                : 
                                    <Redirect to="/login"/>
                                }
                            </>
                        )
                    }}/>
                    <Route path="/cart" render={() => {
                        return (
                            <>
                                {localStorage.getItem('token') ?  
                                    <>
                                    <div className="cart-margin">
                                        <Item.Group>
                                            {this.renderCartProducts()}
                                        </Item.Group>
                                        <h1 style={{"float": "left", "margin": "0px"}}>Total ({this.cartQuantity()} items): ${this.cartTotalPrice()}</h1>
                                        {this.props.cartItems.length === 0 ?
                                            null
                                            :
                                            <NavLink to="/cart/checkout">
                                                <Button floated='right' color="black" >Checkout!</Button>
                                            </NavLink>
                                        }

                                    </div>
                                    </> 
                                    : 
                                    <Redirect to="/login"/>
                                }
                            </>
                        )
                    }}/>
                </Switch>
            </>
        ) 
    }
}

export default Cart;