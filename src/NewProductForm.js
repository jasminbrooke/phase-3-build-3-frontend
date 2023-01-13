import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const NewProductForm = ( { currentUser, handleProducts, edit=false, product={}, setOpen }) => {
    const [errors, setErrors] = useState({})
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
        favorite: false,
        user_id: currentUser.id
    }
    const method = edit ? 'PATCH' : 'POST'
    const API = `http://localhost:9292`
    const URL = edit ? `product/${product.id}` : `products`

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API}/${URL}`, {
            method: method,
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
          })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
                setErrors(data.error)
            } else {
                handleProducts(data)
                setOpen(false)
            }
          })
    }

    useEffect(() => {
        if(edit){
            setProductname(product.productname)
            setDescription(product.description)
            setAvailable(product.available)
            setCategory(product.category)
            setCost(product.cost)
            setImg_url(product.img_url)
            setPrice(product.price)
        }
    }, [])

    return (
        <div>
            <Card sx={{ maxWidth: 400 }}>
            <Typography variant='h4'>Create a Product</Typography>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <CardHeader                    
                        title={
                            <TextField
                                error={errors.productname}
                                helperText={errors.productname}
                                defaultValue={edit ? product.productname : null}
                                onChange={(e) => setProductname(e.target.value)}
                                id="outlined-basic"
                                label="productname"
                                variant="outlined"
                                size="small"
                            />
                        } 
                        subheader={<TextField defaultValue={edit ? product.category : null} onChange={(e) => setCategory(e.target.value)} id="outlined-basic" label="category" variant="outlined" size="small"/>}
                    />
                    <CardMedia
                    component="img"
                    height="194"
                    image={img_url}
                    alt={productname}
                    />
                    <CardContent>
                        <TextField defaultValue={edit ? product.img_url : null} onChange={(e) => setImg_url(e.target.value)} id="outlined-basic" label="img_url" variant="outlined" size="small"/>
                        <Typography paragraph>Details:</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {<TextField defaultValue={edit ? product.description : null} onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label="description" variant="outlined" size="small"/>}
                            </Typography>
                            <TextField
                                defaultValue={edit ? product.cost : null}
                                onChange={(e) => setCost(e.target.value)} 
                                id="outlined-basic" 
                                label="Cost of materials" 
                                variant="outlined" 
                                size="small"
                            />

                            <TextField
                                defaultValue={edit ? product.price : null}
                                onChange={(e) => setPrice(e.target.value)} 
                                id="outlined-basic" 
                                label="Sale price" 
                                variant="outlined" 
                                size="small"
                            />
                            Profit: {price - cost}
                    </CardContent>
                    <Button type="submit">Submit</Button> 
                </form>
            </Card>
        </div>
    )}

export default NewProductForm