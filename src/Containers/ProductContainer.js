import React, { Component } from 'react'
import Product from '../Components/Product'
import Search from '../Components/Search'
import FilterByBrand from '../Components/FilterByBrand'
import 'semantic-ui-css/semantic.min.css'
import {Grid } from 'semantic-ui-react'


class ProductContainer extends Component{

    state = {
        products: [],
        searchValue: "",
        selectedBrand: ""
    }

    componentDidMount = () =>{
        fetch("http://localhost:3000/api/v1/products")
        .then(r => r.json())
        .then(data => this.setState(prevState=>({
            products: data
        })))
    }

    filteredProducts = () => {
        return this.filteredProductsByBrand().filter(productObj => productObj.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) )
    }

    renderProducts = () =>{
        return this.filteredProducts().map(product => <Grid.Column key={product.id}><Product key={product.id} product={product}  addingCartProducts={this.props.addingCartProducts} /></Grid.Column>)
    }

    brandOnChange = (e) => {
        this.setState({ selectedBrand: e.target.value})
    }

    filteredProductsByBrand = () => {
        return this.state.products.filter(product_obj => product_obj.brand.name.includes(this.state.selectedBrand))
    }

    searchHandler = (e) => {
        this.setState({ searchValue: e.target.value})
    }

    render(){
        // console.log(this.filteredProductsByBrand())
        return (
            <>
                <Search searchValue={this.searchValue} searchHandler={this.searchHandler}/>
                <br></br>
                <br></br>
                <FilterByBrand  brandOnChange={this.brandOnChange} />
                <br></br>
                <br></br>

                <Grid relaxed columns ={4}>
                    {this.renderProducts()}
                </Grid>
            </>
        )
    }
}

export default ProductContainer;