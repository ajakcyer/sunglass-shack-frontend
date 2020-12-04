import React from 'react'
import { NavLink, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

class Product extends React.Component {
   
  state = {
    flipped: false
  }

  addToCartHandler = () => {
    this.props.addingCartProducts(this.props.product)
    this.setState({ flipped: true})
  }

  render(){
    return (
      <Card>
        <NavLink to={`/products/${this.props.product.id}`}>
          <Card>
            <img className="product-image" onClick={this.localClickHandler} src={this.props.product.image} />
          </Card>
        </NavLink>
              
        <Card.Content>
          <Card.Header>{this.props.product.name}</Card.Header>
            <Card.Meta>
              <span className='date'>${this.props.product.price}</span>
            </Card.Meta>
          <Card.Description>
            {this.props.product.brand.name}
          </Card.Description>
          </Card.Content>
          <Card.Content extra>
          {localStorage.getItem('token') ? 
          <Button onClick={this.addToCartHandler} color="black" icon="shopping bag" content={this.state.flipped ? "In Cart!" : "Add to Cart"}/>
          : 
          <>
            <NavLink to="/login">Login </NavLink>
            or 
            <NavLink to="/signup"> Sign up </NavLink>
            to shop
          </>
          }
        </Card.Content>
      </Card>
    )
  }
}

export default Product; 