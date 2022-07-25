import React, { useState, useEffect } from 'react'
import ProductList from './ProductList'
import NewProductForm from './NewProductForm'
const API = 'http://localhost:9292'

const UserHome = ( { currentUser } ) => {
    const [currentProducts, setCurrentProducts] = useState([])

    // useEffect(fetch(`${API}/products`)
    // .then(r => r.json())
    // .then(data => setCurrentProducts(data)), [])

    return (
        <div>
           <h1>Welcome, {currentUser.username}! </h1> 
           <NewProductForm currentUser={currentUser} setCurrentProducts={setCurrentProducts} currentProducts={currentProducts}/>
           <ProductList setCurrentProducts={setCurrentProducts} currentProducts={currentProducts}/>
        </div>
    )


}

export default UserHome