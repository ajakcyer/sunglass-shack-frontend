import React from 'react'
import { Form, Button, Divider } from 'semantic-ui-react'


class Checkout extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        email: "",
        phone: "",
        creditCardNum: "",
        expiration: "",
        ccv: ""
    }

    localOnChangeHandler = () =>{

    }

    componentDidMount = () =>{
        // debugger
        this.setState(prevState=>({
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
            ccv: ""
        }))
    }

    

    render (){
        console.log(this.props)
        return(
            <>
                <Form>
                    <h2>User Info:</h2>
                    <Form.Group unstackable widths={2}>
                        <Form.Input name="firstName" label='First name' placeholder='First name' value={this.state.firstName} />
                        <Form.Input name="lastName" label='Last name' placeholder='Last name' value={this.state.lastName} />
                    </Form.Group>

                    <Form.Group unstackable widths={2}>
                        <Form.Input name="address" label='Address' placeholder='Address' value={this.state.address}/>
                        <Form.Input name="address2" label='Address 2' placeholder='Apt# (optionial)' value={this.state.address2}/>
                    </Form.Group>

                    <Form.Group unstackable widths="equal">
                        <Form.Input name="city" label='City' placeholder='City' value={this.state.city} />
                        <Form.Input name="state" label='State' placeholder='State' value={this.state.state} />
                        <Form.Input name="zipCode" label='Zip Code' placeholder='Zip Code' value={this.state.zipCode} />
                    </Form.Group>

                    <Form.Input name="email" label='Email' placeholder='Email' value={this.state.email} />
                        
                        {/* Manual */}
                    <Form.Input name="phone" label='Phone' placeholder='(xxx)-xxx-xxxx' value={this.state.phone}/>
                   
                    <Divider/>
                    <h2>Billing Info:</h2>
                    <Form.Group unstackable widths={3}>
                        <Form.Input name="creditCardNum" label='Credit Card Number' placeholder='####-####-####-####' value={this.state.creditCardNum}/>
                        <Form.Input name="expiration" label='Expiration' placeholder='MM/YY' value={this.state.expiration}/>
                        <Form.Input name="ccv" label='CCV' placeholder='CCV' value={this.state.ccv} />
                    </Form.Group>


                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                    <Button type='submit'>Submit</Button>
                </Form>
            </>
        ) 
    }
}

export default Checkout;