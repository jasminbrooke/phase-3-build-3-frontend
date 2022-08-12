import React from 'react'
import { Box } from '@mui/material';
import ProductCard from './ProductCard'

const ProductList = ({ filteredProducts, handleDelete, handleOpen, getProducts }) => {

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            {
                filteredProducts.map((product, i) => <ProductCard
                                                        key={i}
                                                        product={product}
                                                        handleDelete={handleDelete}
                                                        handleOpen={handleOpen}
                                                        getProducts={getProducts}
                                                     />)
            }
        </Box>
    )    
}

export default ProductList