import React from 'react'
import { Form, Button, Divider, Modal, Image, Icon } from 'semantic-ui-react'
import { NavLink, Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Confirmation from './Confirmation'


class Checkout extends React.Component {

    state = {
        firstName: this.props.current_user.first_name,
        lastName: this.props.current_user.last_name,
        address: this.props.current_user.address,
        address2: this.props.current_user.address2,
        city: this.props.current_user.city,
        state: this.props.current_user.state,
        zipCode: this.props.current_user.zipcode,
        email: this.props.current_user.email,
        phone: "",
        creditCardNum: "",
        expiration: "",
        ccv: "",
        submitted: false,
        open: false
    }

    localOnChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    localSubmitHandler = (e) => {
        e.preventDefault()
        let stateObjectValues = Object.values(this.state)
        let filteredValues = stateObjectValues.filter(value => value === "N/A" || value.length < 1)
        if(filteredValues.length === 0){
            this.setState({submitted: true})
            this.props.updatedUserInfoCheckout(this.state)
            this.props.checkoutHandler()
        }else {
            alert("Every field must be completed ‼️")
        }
    }

    renderModalContent = () =>{
        return this.props.cartItems.map(item => <>
        <Modal.Content image scrolling className="modal-content">
            <Image size="medium" src={item.product.image} />
            <div className="float">
                <h3>{item.product.name}</h3>
                <p >Price: ${item.product.price}</p>
                <p >Quantity: {item.quantity}</p>
            </div>
            <br></br>
            <br></br>
            <Divider/>
            </Modal.Content>
            </>)
    }

    render (){
        return(      
            <>



                <Switch>
                    <Route path="/cart/checkout/confirmation" render={() => <Confirmation submitted={this.state.submitted} current_user={this.props.current_user} />}/>
                    <Route path="/cart/checkout" render={() => {
                    return(
                        <>
                        <div className="form-modal">



                            <Modal
                                open={this.state.open}
                                onClose={() => this.setState({open: false})}
                                onOpen={() => this.setState({open: true})}
                                trigger={<Button color="black" className="reviewcartbtn">Review Cart</Button>}
                                >
                                    <Modal.Header>Your Current Cart</Modal.Header>
                                    {/* <Modal.Content image scrolling> */}
                                        {this.renderModalContent()}
                                    {/* </Modal.Content> */}
                                    <Modal.Actions>
                                        {/* <NavLink to="/cart"> */}
                                            <Button onClick={() => 
                                                this.setState({open: false}, ()=> this.props.history.push('/cart'))
                                                } primary>
                                            Edit Cart <Icon name='chevron left' />
                                            </Button>
                                        {/* </NavLink> */}
                                        <Button onClick={() => this.setState({open: false})} primary>
                                        Proceed <Icon name='chevron right' />
                                        </Button>
                                    </Modal.Actions>
                                </Modal>

                            <Form className="hideoverflow" onSubmit={this.localSubmitHandler} action="/cart/checkout/" >
                                <h2>User Info:</h2>
                                <Form.Group unstackable widths={2}>
                                    <Form.Input name="firstName" label='First name' placeholder='First name' value={this.state.firstName} />
                                    <Form.Input name="lastName" label='Last name' placeholder='Last name' value={this.state.lastName} />
                                </Form.Group>

                                <Form.Group unstackable widths={2}>
                                    <Form.Input name="address" label='Address' placeholder='Address' value={this.state.address} onChange={this.localOnChangeHandler}/>
                                    <Form.Input name="address2" label='Address 2' placeholder='Apt# (optionial)' value={this.state.address2} onChange={this.localOnChangeHandler}/>
                                </Form.Group>

                                <Form.Group unstackable widths="equal">
                                    <Form.Input name="city" label='City' placeholder='City' value={this.state.city} onChange={this.localOnChangeHandler} />
                                    <Form.Input name="state" label='State' placeholder='State' value={this.state.state} onChange={this.localOnChangeHandler}/>
                                    <Form.Input name="zipCode" label='Zip Code' placeholder='Zip Code' value={this.state.zipCode} onChange={this.localOnChangeHandler} />
                                </Form.Group>

                                <Form.Input name="email" label='Email' placeholder='Email' value={this.state.email} onChange={this.localOnChangeHandler} />   
                                <Form.Input name="phone" label='Phone' placeholder='(xxx)-xxx-xxxx' value={this.state.phone} onChange={this.localOnChangeHandler}/>
                                <Divider/>

                                <h2>Billing Info:</h2>
                                <Form.Group unstackable widths={3}>
                                    <Form.Input name="creditCardNum" label='Credit Card Number' placeholder='####-####-####-####' value={this.state.creditCardNum} onChange={this.localOnChangeHandler}/>
                                    <Form.Input name="expiration" label='Expiration' placeholder='MM/YY' value={this.state.expiration} onChange={this.localOnChangeHandler}/>
                                    <Form.Input name="ccv" label='CCV' placeholder='CCV' value={this.state.ccv} onChange={this.localOnChangeHandler} />
                                </Form.Group>

                                <Form.Checkbox label='I agree to the Terms and Conditions' />
                                <Button color="black" type='submit'> Place your order</Button>
                            </Form>
                        </div>
                        </>
                    )
                }}/>
            </Switch>
            </>
        ) 
    }
}

export default withRouter(Checkout);