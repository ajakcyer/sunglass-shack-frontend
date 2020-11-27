import '../App.css';
import React, { Component } from 'react'
import Header from './Header'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import Cart from '../Containers/Cart'
import ProductContainer from '../Containers/ProductContainer'

class ProductPage extends Component {


    render(){
        return (
        <>  
            <Header />
            <Login /> 
            <Signup /> 
            <Cart />
            <ProductContainer />

        </>
        )
    }
}

export default ProductPage