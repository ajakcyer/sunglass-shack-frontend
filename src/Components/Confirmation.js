import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Item } from 'semantic-ui-react'

export default class Confirmation extends Component {

    


    render() {
        console.log(this.props.cartItems)
        return (

            <>
                <h2 style={{"textAlign": "center"}}>{this.props.current_user.first_name +" "+ this.props.current_user.last_name} Thank You for Shopping with us!!! 💸</h2>
                <NavLink to="/products"> 
                    <button>Continue Shopping</button>
                </NavLink>
            </>
        )
    }
}
