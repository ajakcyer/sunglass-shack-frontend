import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'


export default class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    onChangeHandler = (e) =>{
        this.setState(prevState=>({
            [e.target.name]: e.target.value
        }))
    }
    
    localSubmit = (e) =>{
        e.preventDefault()
        this.props.loginSubmitHandler(this.state)
    } 

    render() {
        return (
            <>
            <Form onSubmit={this.localSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input onChange={this.onChangeHandler} type="text" name="username" placeholder='enter username' value={this.state.username} />
                </Form.Field>

                <Form.Field>
                    <label>Password</label>
                    <input onChange={this.onChangeHandler} type="text" name="password" placeholder='enter password' value={this.state.password}/>
                </Form.Field>
                
                <Button type='submit'>Log In</Button>
            </Form>
            </>
        )
    }
}
