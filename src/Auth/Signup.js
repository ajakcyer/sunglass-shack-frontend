import React, { Component } from 'react'
import { Form, Button, Divider } from 'semantic-ui-react'

export default class Signup extends Component {

    state = {
        firstName: "",
        lastName: "",
        age: "",
        userName: "",
        email: "",
        password1: "",
        password2: "",
        clicked: false
    }

    localOnChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    localSubmitHandler = (e) => {
        e.preventDefault()
        if(this.state.password1 === this.state.password2){
            this.setState({clicked: true})
            this.props.signUpSubmitHandler(this.state)
        }else {
            alert("Passwords do not match, please try again!")
        }
    }

    render() {
        return (
            <>
                <Form className="format-forms" onSubmit={this.localSubmitHandler} action="/cart/checkout/" >
                    <h2>User Info:</h2>
                    <Form.Group unstackable widths={2}>
                        <Form.Input name="firstName" label='First Name' placeholder='First Name' value={this.state.firstName} onChange={this.localOnChangeHandler}/>
                        <Form.Input name="lastName" label='Last Name' placeholder='Last Name' value={this.state.lastName} onChange={this.localOnChangeHandler}/>
                        <Form.Input name="age" type="number" label='Age' placeholder='Age' value={this.state.age} onChange={this.localOnChangeHandler}/>
                    </Form.Group>

                    <Form.Group unstackable widths={2}>
                        <Form.Input name="userName" label='Username' placeholder='Username' value={this.state.userName} onChange={this.localOnChangeHandler}/>
                    </Form.Group>

                    <Form.Input name="email" label='Email' placeholder='Email Address' value={this.state.email} onChange={this.localOnChangeHandler}/>
                    <Form.Input name="password1" type="password" label='Password' placeholder='Password' value={this.state.password} onChange={this.localOnChangeHandler}/>
                    <Form.Input name="password2" type="password" label='Confirm Password' placeholder='Password' value={this.state.password} onChange={this.localOnChangeHandler}/>
                    {this.state.clicked ?  <Button color="black" loading >Create Account!</Button> : <Button color="black">Create Account!</Button>}
                    
                </Form>
            </>
        )
    }
}
