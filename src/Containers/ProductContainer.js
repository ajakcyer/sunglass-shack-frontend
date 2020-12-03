import React, { Component } from 'react'
import Product from '../Components/Product'
import Search from '../Components/Search'
import FilterByBrand from '../Components/FilterByBrand'
import 'semantic-ui-css/semantic.min.css'
import {Grid, Advertisement } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import ProductInfo from '../Components/ProductInfo'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


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
        const slideImages = [
            'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fmadmartech.com%2Fwp-content%2Fuploads%2F2019%2F05%2F970x250-1.png',
            'https://www.gourmetads.com/wp-content/uploads/2019/02/970x250-starbucks.jpg',
            'https://2020census.gov/content/dam/2020census/whole-story/influencer/not-too-late-970x250.jpg'
          ];
        return (
            <>
            {/* <Advertisement as="img"unit='billboard' centered test='Billboard' />  */}
           
                {this.state.products.length === 0 ? 
                
                <h1 className="loading">Loading products...</h1>
                
                : 
                    <>
                        <Switch>
                            <Route path="/products/:id" render={({match})=> {
                                let urlId = parseInt(match.params.id)
                                let foundProduct = this.state.products.find(product=> product.id === urlId)
                                return <ProductInfo product={foundProduct} addingCartProducts={this.props.addingCartProducts} />

                            }}/>
                            <Route path="/products" render={()=> (
                                <>
                                    {/* <img className="ad-image" src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fmadmartech.com%2Fwp-content%2Fuploads%2F2019%2F05%2F970x250-1.png" /> */}
                                    <div>
                                        <Slide easing="ease">
                                        <div className="each-slide">
                                            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                                            {/* <span>Slide 1</span> */}
                                            </div>
                                        </div>
                                        <div className="each-slide">
                                            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                                            {/* <span>Slide 2</span> */}
                                            </div>
                                        </div>
                                        <div className="each-slide">
                                            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                                            {/* <span>Slide 3</span> */}
                                            </div>
                                        </div>
                                        </Slide>
                                    </div>

                                    <div className="inputs">
                                        <Search searchValue={this.searchValue} searchHandler={this.searchHandler}/>
                                        <FilterByBrand  brandOnChange={this.brandOnChange} />

                                    </div>
                                        <br></br>
                                        <br></br>

                                    <Grid relaxed centered container columns={4}>
                                        {this.renderProducts()}
                                    </Grid>
                                </>
                            )}/>
                        </Switch>
                    </>
                }
            </>
        )
    }
}

export default ProductContainer;