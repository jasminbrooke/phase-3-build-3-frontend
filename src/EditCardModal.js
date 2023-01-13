import React from 'react'
import NewProductForm from './NewProductForm'
import { Box, Modal } from '@mui/material'

const EditCardModal =( { open, handleClose, currentUser, handleProducts, product, setOpen } ) => {
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
                    product={product}
                    setOpen={setOpen}
                />
            </Box>
        </Modal>          
    )
}

export default EditCardModal