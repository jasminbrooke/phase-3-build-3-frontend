import React, { useState } from 'react'
import ProductList from './ProductList'
import NewProductForm from './NewProductForm'
import FilterBar from './FilterBar'
import EditCardModal from './EditCardModal'

const UserHome = ( { currentUser, currentProducts, handleProducts, handleDelete, getProducts } ) => {
    const [filter, setFilter] = useState('')
    const [open, setOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({})
    const handleClose = () => setOpen(false);
    const handleOpen = (product) => {
        setSelectedProduct(product)
        setOpen(true)
    }

    const handleFilter = (value) => setFilter(value) 

    const filteredProducts = currentProducts.filter((p) => {
        if (filter === 'Favorite') {
            return p.favorite === true
        } else if(filter === 'Available') {
            return p.available === true
        } else {
            return p
        }
    })

    return (
        <div>
            <div id='userHomeDiv'>
                    <NewProductForm currentUser={currentUser} handleProducts={handleProducts} setOpen={setOpen}/>
                <div>
                    <h1>Welcome, {currentUser.displayname}! </h1>
                    <FilterBar filter={filter} handleFilter={handleFilter}/>
                    <ProductList 
                        getProducts={getProducts}
                        handleDelete={handleDelete}
                        handleOpen={handleOpen}
                        filteredProducts={filteredProducts}
                    /> 
                </div>
                <EditCardModal
                    open={open}
                    onClose={handleClose}
                    currentUser={currentUser}
                    handleProducts={handleProducts}
                    product={selectedProduct}
                    setOpen={setOpen}
                />
            </div>
        </div>
    )
}

export default UserHome