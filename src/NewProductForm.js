import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';

const API = 'http://localhost:9292'


const NewProductForm = ( { currentUser, setCurrentProducts, currentProducts }) => {
    const [productname, setProductname] = useState('Unnamed Product')
    const [description, setDescription] = useState('This product has no description.')
    const [available, setAvailable] = useState(true)
    const [cost, setCost] = useState('0')
    const [price, setPrice] = useState('0')
    const [category, setCategory] = useState('Uncategorized')
    const [img_url, setImg_url] = useState('http://www.clipartbest.com/cliparts/eTM/yMq/eTMyMqxAc.png')
    const newProduct = {
        productname: productname, 
        description: description, 
        available: available, 
        cost: cost, 
        price: price, 
        category: category, 
        img_url: img_url,
        user_id: currentUser.id
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API}/products`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
          })
          .then(res => res.json())
          .then(data => setCurrentProducts([...currentProducts, data]))
          .then(console.log(currentProducts))
    }

return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField onChange={(e) => setProductname(e.target.value)} id="outlined-basic" label="productname" variant="outlined" />
            <TextField onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label="description" variant="outlined" />
            <TextField onChange={(e) => setAvailable(e.target.value)} id="outlined-basic" label="available" variant="outlined" />
            <TextField onChange={(e) => setCost(e.target.value)} id="outlined-basic" label="cost" variant="outlined" />
            <TextField onChange={(e) => setPrice(e.target.value)} id="outlined-basic" label="price" variant="outlined" />
            <TextField onChange={(e) => setCategory(e.target.value)} id="outlined-basic" label="category" variant="outlined" />
            <TextField onChange={(e) => setImg_url(e.target.value)} id="outlined-basic" label="img_url" variant="outlined" />
            <Button type="submit">Submit</Button> 
        </form>
    </div>
)
}

export default NewProductForm