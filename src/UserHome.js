import React, { useState } from 'react'
import ProductList from './ProductList'
import NewProductForm from './NewProductForm'
import { Box, IconButton, Modal } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SellIcon from '@mui/icons-material/Sell';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


const API = 'http://localhost:9292'

const UserHome = ( { currentUser, currentProducts, handleProducts, handleDelete } ) => {
    const [open, setOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({})
    const handleClose = () => setOpen(false);
    const handleOpen = (product) => {
        setSelectedProduct(product)
        setOpen(true)
    }

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
                    <IconButton><FavoriteIcon/>Show Bestsellers</IconButton>
                    <IconButton><SellIcon/>Show Currently Available Products</IconButton>
                    <IconButton><FilterAltOffIcon/>Remove Filters</IconButton>
                    <ProductList currentProducts={currentProducts} handleDelete={handleDelete} handleOpen={handleOpen}/> 
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