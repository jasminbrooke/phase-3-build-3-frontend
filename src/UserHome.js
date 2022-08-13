import React, { useState } from 'react'
import ProductList from './ProductList'
import NewProductForm from './NewProductForm'
import { Box, IconButton, Modal } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SellIcon from '@mui/icons-material/Sell';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { pink } from '@mui/material/colors';

const UserHome = ( { currentUser, currentProducts, handleProducts, handleDelete, getProducts } ) => {
    const [filter, setFilter] = useState('')
    const [open, setOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({})
    const handleClose = () => setOpen(false);
    const handleOpen = (product) => {
        setSelectedProduct(product)
        setOpen(true)
    }

    const filteredProducts = currentProducts.filter((p) => {
        if (filter === 'Favorite') {
            return p.favorite === true
        } else if(filter === 'Available') {
            return p.available === true
        } else {
            return p
        }
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <div>
            <div id='userHomeDiv'>
                    <NewProductForm currentUser={currentUser} handleProducts={handleProducts}/>
                <div>
                    <h1>Welcome, {currentUser.displayname}! </h1>
                    <IconButton 
                        disabled={filter === 'Favorite'}
                        onClick={() => setFilter('Favorite')}
                    >
                        {filter === 'Favorite' ? <FavoriteIcon sx={{ color: pink[500] }}/> : <FavoriteIcon/>}
                        Show Bestsellers
                    </IconButton>
                    <IconButton 
                        disabled={filter === 'Available'}
                        onClick={() => setFilter('Available')}
                    >
                        {filter === 'Available' ? <SellIcon color='success'/> : <SellIcon/>}
                        Show Currently Available Products
                    </IconButton> 
                    <IconButton 
                        disabled={filter === 'None'}
                        onClick={() => setFilter('None')}
                    >
                        <FilterAltOffIcon/>
                        Remove Filter
                    </IconButton>
                    <ProductList 
                        getProducts={getProducts}
                        handleDelete={handleDelete}
                        handleOpen={handleOpen}
                        filteredProducts={filteredProducts}
                    /> 
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <NewProductForm
                            currentUser={currentUser}
                            handleProducts={handleProducts}
                            edit={true}
                            product={selectedProduct}
                            setOpen={setOpen}
                        />
                    </Box>
                </Modal>          
            </div>
           

        </div>
    )


}

export default UserHome