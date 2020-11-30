import React from 'react'
import { NavLink } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

class Product extends React.Component {
    // console.log(this.props.product)

    addToCartHandler = () => {
    //   console.log("clicked", this.props.product)
      this.props.addingCartProducts(this.props.product)
    }

    render(){
        console.log(this.props.product)
      return (
          <Card>
              <Image src={this.props.product.image} wrapped ui={false} />
              <Card.Content>
              <Card.Header>{this.props.product.name}</Card.Header>
              <Card.Meta>
                  <span className='date'>${this.props.product.price}</span>
              </Card.Meta>
              <Card.Description>
                  {this.props.product.description}
              </Card.Description>
              </Card.Content>
              <Card.Content extra>
                {localStorage.getItem('token') ? 
              <Button onClick={this.addToCartHandler} animated='vertical'>
                  <Button.Content hidden>Purchase</Button.Content>
                  <Button.Content visible>
                      <Icon name='shop' />
                  </Button.Content>
              </Button>
                
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