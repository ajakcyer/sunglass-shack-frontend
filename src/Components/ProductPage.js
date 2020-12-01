import '../App.css';
import React, { Component } from 'react'
import Header from './Header'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import Cart from '../Containers/Cart'
import ProductContainer from '../Containers/ProductContainer'
import { NavLink, Route, Switch, withRouter, Redirect } from 'react-router-dom'
import {  Icon, Button } from 'semantic-ui-react'

class ProductPage extends Component {

    state = {
        cartItems: [],
        current_user: null,
        current_cart: null
    }

    // currentUserCart = () =>{
        
    // }

    addingCartProducts = (product) => {
        // 
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
        let thisCart = this.state.current_user.carts.find(cartObj => cartObj.history === false)
        // debugger
        if (thisCart){
            
            this.setState(prevState=>({
                current_cart: thisCart

            }), () =>  this.fetchCartProducts())
           
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
            .then(data => {
                let copiedUser = {...this.state.current_user}
                copiedUser.carts.push(data)
                this.setState(prevState=>({
            
                current_cart: data,
                current_user: copiedUser

            }))})
            .catch(console.log)
        }
    }

    fetchCartProducts = () =>{
        fetch("http://localhost:3000/api/v1/cart_products")
        .then(r => r.json())
        .then(data => {
            let thisUserProducts = data.filter(dataObj => dataObj.cart.user_id === this.state.current_user.id && dataObj.cart.history === false)
            // 
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
            // 
            if(data.user){
                this.setState(prevState=> ({
                current_user: data.user,
                current_cart:  data.user.carts[0]
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
            // 
            if (data.user){
                this.setState(prevState=> ({
                    current_user: data.user
                }), () =>{
                    this.foundCart()
                    
                    console.log(this.state.current_user)
                })
                
                localStorage.setItem("token", data.jwt)
                this.props.history.push('/products')
                return
            }
            // console.log(data)
        })
        .catch(console.log)
    }

    logoutHandler = (e) =>{
        e.preventDefault()
        localStorage.removeItem('token')
        this.setState(prevState=>({
            current_user: null,
            current_cart: null,
            cartItems: []
        }))
    }

    deleteCartProductHandler = (object) => {
        fetch(`http://localhost:3000/api/v1/cart_products/${object.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then((nothing) => {
            let copiedArray = [...this.state.cartItems]
            let newList = copiedArray.filter(cartP => cartP.id !== object.id)
            this.setState({ cartItems: newList})
        })
        .catch(console.log)
    }

    checkoutHandler = (checkoutObj) => {
        // console.log("purchased", checkoutObj, this.state.current_cart.id, this.state.current_user)
    
        fetch(`http://localhost:3000/api/v1/carts/${this.state.current_cart.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ history: true})
        })
        .then(r => r.json())
        .then(updatedCart => {
            let copiedUser = {...this.state.current_user}
            let cartIndex = copiedUser.carts.findIndex(cart => cart.id === updatedCart.id)
            copiedUser.carts[cartIndex] = updatedCart
            // debugger
            this.setState({ 
                current_cart:null,
                cartItems: [],
                current_user: copiedUser
            
            }, () => {
                this.foundCart()

            })
        })
        .catch(console.log)


        this.props.history.push("/cart/checkout/confirmation")
    }

    render(){
        // console.log(this.props)
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
                {/* <button>Cart</button> */}
                <Button animated='vertical'>
                  <Button.Content hidden>{this.state.cartItems.map(cartP => cartP.quantity).reduce((a, b)=> a + b, 0)}</Button.Content>
                  <Button.Content visible>
                      <Icon name='shop' />
                  </Button.Content>
              </Button>
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
                   
                   {this.state.current_user !== null ? 
                   <Route path="/cart" render={() => <Cart current_user={this.state.current_user} cartItems={this.state.cartItems} updateQuantityHandler={this.updateQuantityHandler}  deleteCartProductHandler={ this.deleteCartProductHandler} checkoutHandler={this.checkoutHandler}/>}/> 
                   : 
                   null
               }
                   
                   
                   <Route path="/products" render={() => <ProductContainer  addingCartProducts={ this.addingCartProducts} />}/>
                </Switch>
        </>
        )
    }
}

export default withRouter(ProductPage)