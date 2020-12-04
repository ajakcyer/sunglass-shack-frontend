import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Item, Button } from 'semantic-ui-react'
import Confetti from 'react-confetti'


export default class Confirmation extends Component {


    render() {
        console.log(this.props.submitted)
        return (

            <>
                <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                />
                <div className="confirmation-page">
                    <h1>Confirmation #{Math.floor(Math.random() * 999999) + 800000}</h1>
                    <img src="https://media1.giphy.com/media/z2D26GunfUK1W/giphy.gif" alt="confirm-img"/>
                    <h2 style={{"textAlign": "center"}}>{this.props.current_user.first_name +" "+ this.props.current_user.last_name}, thank you for shopping with us!!! 💸</h2>
                    <NavLink to="/products"> 
                        <Button color='black'>Continue Shopping</Button>
                    </NavLink>

                </div>
            </>
        )
    }
}
