import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class FilterByBrand extends Component {

    state = {
        brands: []
        // selectedBrand: ""
    }

    componentDidMount = () =>{
        fetch("http://localhost:3000/api/v1/brands")
        .then(r => r.json())
        .then(data => this.setState(prevState=>({
            brands: data
        })))
    }

    renderBrandOptions = () => {
        return this.state.brands.map(brand => <option key={brand.id} value={brand.name}> {brand.name}</option>)
    }
    

    render() {
     
        // { this.brandProducts()}
        return (
            <select className="filter-input" onChange={this.props.brandOnChange} > 
                <option value="">Select Brand</option>
                 {this.renderBrandOptions()}
            </select>
            
        )
    }
}
