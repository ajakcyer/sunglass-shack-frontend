import React, { Component } from 'react'
import '../App.css';
import { Item , Button, Icon} from 'semantic-ui-react'

export default class ProductInfo extends Component {

    state = {
        switch: false 
    }

    addToCartHandler = () => {
        this.props.addingCartProducts(this.props.product)
        this.setState({ switch: true})
    }

    render() {
        console.log("Clicked product:", this.props.product)
        return (
            <>
            <Item className="product-info-cont">
                <Item.Image size="large" src={this.props.product.image} />

                <Item.Content>
                    <Item.Header >{this.props.product.name}</Item.Header>
                    <Item.Meta>
                    <span className='cinema'>$ {this.props.product.price}</span>
                    </Item.Meta>
                    <label className="desc-tag">Description: </label>
                    <Item.Description>{this.props.product.description}</Item.Description>
                    <Item.Extra>
                    <Button onClick={this.addToCartHandler} primary floated='right'>
                    {this.state.switch ? "In Cart!" : "Add to Cart"}
                        <Icon name='right chevron' />
                    </Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
            </>
        )
    }
}
