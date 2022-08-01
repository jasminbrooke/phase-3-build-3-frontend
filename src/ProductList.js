import React, { useState } from 'react'
import { Box } from '@mui/material';
import ProductCard from './ProductCard'
const API = 'http://localhost:9292'


const ProductList = ({ currentProducts, handleDelete, handleOpen }) => {

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            {currentProducts.map((product, i) => <ProductCard key={i} product={product} handleDelete={handleDelete} handleOpen={handleOpen}/>)}
        </Box>
    )    
}

export default ProductList