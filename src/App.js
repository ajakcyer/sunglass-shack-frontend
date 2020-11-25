import logo from './logo.svg';
import './App.css';
import React from 'react'
import Header from './Components/Header'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Cart from './Containers/Cart'
import ProductContainer from './Containers/ProductContainer'

class App extends React.Component {
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

export default App;
