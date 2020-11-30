import '../App.css';
import React, { Component } from 'react'
import Header from './Header'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import Cart from '../Containers/Cart'
import ProductContainer from '../Containers/ProductContainer'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'

class ProductPage extends Component {

    state = {
        cartItems: [],
        current_user: null,
        current_cart: null
    }

    currentUserCart = () =>{
        debugger
    }

    addingCartProducts = (product) => {
        // debugger
        fetch("http://localhost:3000/api/v1/cart_products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                product_id: product.id,
                cart_id: this.state.current_cart.id
            })
        })
        .then(r => r.json())
        .then( newCartProduct => this.setState({ cartItems: [...this.state.cartItems, newCartProduct]}))
    }

    foundCart = () => {
        if (this.state.current_user.carts.length > 0){
            this.setState(prevState=>({
                current_cart: this.state.current_user.carts[0]
            }), () => this.fetchCartProducts() )
            
        } else {
            fetch("http://localhost:3000/api/v1/carts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    'user_id': this.state.current_user.id
                })
            })
            .then(r => r.json())
            .then(data => this.setState(prevState=>({
                current_cart: data
            })))
            .catch(console.log)
        }
    }

    fetchCartProducts = () =>{
        fetch("http://localhost:3000/api/v1/cart_products")
        .then(r => r.json())
        .then(data => {
            let thisUserProducts = data.filter(dataObj => dataObj.cart.user_id === this.state.current_user.id )
            // debugger
            this.setState({ cartItems: thisUserProducts})
        })
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token')

        fetch("http://localhost:3000/api/v1/profile", {
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(r=>r.json())
        .then(data => {
            // debugger
            if(data.user){
                this.setState(prevState=> ({
                current_user: data.user
                }), ()=>{
                    if (localStorage.getItem('token')){
                        this.fetchCartProducts()
            
                    }
                })
            }
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

    loginSubmitHandler = (userInfo) =>{
        // console.log("in pp app", userInfo)

        fetch("http://localhost:3000/api/v1/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({user: userInfo})
        })
        .then(r => r.json())
        .then(data => {
            // debugger
            if (data.user){
                this.setState(prevState=> ({
                    current_user: data.user
                }), () =>{
                    this.foundCart()
                    // debugger
                    console.log(this.state.current_user)
                })
                
                localStorage.setItem("token", data.jwt)
                this.props.history.push('/products')
                
                return
            }
            console.log(data)
        })
        .catch(console.log)
    }

    logoutHandler = (e) =>{
        e.preventDefault()
        localStorage.removeItem('token')
        this.setState(prevState=>({
            current_user: null
        }))
    }
    

    render(){
        return (
        <>  
            <Header />
            {/* <Login />  */}

            <NavLink to="/products">
                Sunglasses
            </NavLink>

            <br></br>
            {localStorage.getItem('token') ? 
            <>

            <button className="logout" onClick={this.logoutHandler}>Log Out</button>
            <br></br>
            <NavLink to="/cart">
                <button>Cart</button>
            </NavLink>
            </>
            : 
            <>
            <NavLink to="/login">Log In</NavLink>
            <br></br>
            <NavLink to="/signup">Sign up</NavLink>
            <br></br>
            {/* <Signup />  */}
            </>

            }

            <Switch>
                <Route path="/signup" render={()=> <Signup/>} />
                <Route path="/login" render={()=> <Login loginSubmitHandler={this.loginSubmitHandler}/>} />
                <Route path="/cart" render={() => <Cart current_user={this.state.current_user} cartItems={this.state.cartItems} updateQuantityHandler={this.updateQuantityHandler} />}/> 
                <Route path="/products" render={() => <ProductContainer  addingCartProducts={ this.addingCartProducts} />}/>
            </Switch>
           
            
           
        </>
        )
    }
}

export default withRouter(ProductPage)