import React, { Component } from 'react'
import Product from '../Components/Product'
import Search from '../Components/Search'
import FilterByBrand from '../Components/FilterByBrand'
import 'semantic-ui-css/semantic.min.css'
import {Grid } from 'semantic-ui-react'


class ProductContainer extends Component{

    state = {
        products: []
    }

    componentDidMount = () =>{
        fetch("http://localhost:3000/api/v1/products")
        .then(r => r.json())
        .then(data => this.setState(prevState=>({
            products: data
        })))
    }

    renderProducts = () =>{
        return this.state.products.map(product => <Grid.Column><Product key={product.id} product={product}/></Grid.Column>)
    }



    render(){
        console.log(this.state.products)
        return (
            <>
                <Grid relaxed columns ={4}>
                    {this.renderProducts()}
                </Grid>
                <Search />
                <FilterByBrand />
            </>
        )
    }
}

export default ProductContainer;