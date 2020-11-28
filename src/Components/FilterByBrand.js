import React, { Component } from 'react'

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
        return this.state.brands.map(brand => <option value={brand.name}> {brand.name}</option>)
    }

    // brandProducts = () => {
    //     let singleBrand = this.state.brands.filter(brand => brand.name === this.state.selectedBrand)
    //     return singleBrand.map(brandObj => brandObj.products )
    // }

    render() {
     
        // { this.brandProducts()}
        return (
            <select onChange={this.props.brandOnChange} > 
                <option value="">Select Brand</option>
                 {this.renderBrandOptions()}
            </select>
        )
    }
}
