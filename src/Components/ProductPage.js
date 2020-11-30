import '../App.css';
import React, { Component } from 'react'
import Header from './Header'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import Cart from '../Containers/Cart'
import ProductContainer from '../Containers/ProductContainer'
import { NavLink, Route, Switch} from 'react-router-dom'

class ProductPage extends Component {

    state = {
        cartItems: [],
    }

    addingCartProducts = (product) => {
        fetch("http://localhost:3000/api/v1/cart_products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                product_id: product.id,
                cart_id: 1
            })
        })
        .then(r => r.json())
        .then( newCartProduct => this.setState({ cartItems: [...this.state.cartItems, newCartProduct]}))
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/cart_products")
        .then(r => r.json())
        .then(data => {
            let thisUserProducts = data.filter(dataObj => dataObj.cart.user_id === 1 )
            this.setState({ cartItems: thisUserProducts})
        })
    }

    updateQuantityHandler = (cartProduct, updatedQuantity) => {
        console.log("testing", cartProduct, updatedQuantity) 
        
        if(updatedQuantity >= 1 && updatedQuantity <= 4){
            fetch(`http://localhost:3000/api/v1/cart_products/${cartProduct.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ quantity: updatedQuantity })
            })
            .then(r => r.json())
            .then(newItem => {
                let copiedArray = [...this.state.cartItems]
                let oldObject = copiedArray.findIndex(itemObj => itemObj.id === newItem.id )
                copiedArray[oldObject] = newItem
                this.setState({ cartItems: copiedArray})
            })
            // console.log("not being warned:", updatedQuantity)
        }

    }


    render(){
        return (
        <>  
            <Header />
            <Login /> 
            <Signup /> 
            <NavLink to="/cart">
                <button>Cart</button>
            </NavLink>
            <Switch>
                <Route path="/cart" render={() => <Cart cartItems={this.state.cartItems} updateQuantityHandler={this.updateQuantityHandler} />}/> 
                <Route path="/products" render={() => <ProductContainer  addingCartProducts={ this.addingCartProducts} />}/>
            </Switch>
           
            
           
        </>
        )
    }
}

export default ProductPage