import React from 'react'
import Product from '../Components/Product'
import Search from '../Components/Search'
import FilterByBrand from '../Components/FilterByBrand'

const ProductContainer = () => {
    return (
        <>
            <Product />
            <Search />
            <FilterByBrand />
        </>
    )
}

export default ProductContainer;