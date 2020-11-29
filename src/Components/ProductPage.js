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
                <Route path="/cart" render={() => <Cart cartItems={this.state.cartItems} />}/> 
                <Route path="/products" render={() => <ProductContainer  addingCartProducts={ this.addingCartProducts} />}/>
            </Switch>
           
            
           
        </>
        )
    }
}

export default ProductPage