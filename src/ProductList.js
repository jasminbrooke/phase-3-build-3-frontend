import React, { useState } from 'react'
import ProductCard from './ProductCard'
const API = 'http://localhost:9292'


const ProductList = ({setCurrentProducts, currentProducts}) => {
    return (
        <div>
        {currentProducts.map((product, i) => <ProductCard key={i} product={product} />)}
        </div>
    )    
}

export default ProductList