import React, { useEffect, useState } from 'react'
import Home from './Home'
import UserHome from './UserHome'
import './App.css'

const API = 'http://localhost:9292'

function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentProducts, setCurrentProducts] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    fetch(`${API}/users`)
    .then(r => r.json())
    .then(data => {
      setUsers(data)
      // setCurrentUser(data.user)
      // setCurrentProducts(data.products)
    })
  }

  const handleLogin = (id) => {
    if(id === null){
      setCurrentUser(null)
      setCurrentProducts([])
    } else {
    const selectedUser = users.find(user => user.id === id)
    setCurrentUser(selectedUser)
    setCurrentProducts(selectedUser.products)}
  }

  const getProducts = () => {
    fetch(`${API}/products/${currentUser.id}`)
    .then(res => res.json())
    .then(data => setCurrentProducts(data))
  }

  const handleSignup = (userName, displayName) => {
    fetch(`${API}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: userName,
        displayname: displayName
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        setErrors(data.error)
      } else {
        setUsers([...users, data])
        setCurrentUser(data)
      }
    })
  }

  const handleProducts = (formData) => {
    const editedOrNewProduct = formData // this is the product from the NewProductForm that could be either new or edited
    if (currentProducts.find(product => product.id === editedOrNewProduct.id)) { // if editedOrNewProduct is in currentProducts, that means we're editing, and do the following
      const editedProducts = currentProducts.map(product => {
       if (product.id === editedOrNewProduct.id) {
        return editedOrNewProduct // replace old version of product with edited one
       } else {
        return product // return the products that we're not editing as well
       }
      })
      setCurrentProducts(editedProducts)
      
      // Other ways to do this
      // 1.
      // let index = currentProducts.findIndex(product => product.id === editedOrNewProduct.id) // find the index of the editedProduct in the currentProducts array
      // let editedProducts = currentProducts // make a copy of currentProducts that we can edit
      // editedProducts[index] = editedOrNewProduct // using the copy that we can edit, and using the index we found above, we find the product we want to edit and replace it with the new version in the copy array
      // setCurrentProducts(editedProducts) // update currentProducts in state by replacing IT with the copy array
      // 2.
      // const editedProducts = currentProducts.filter(p => p.id !== editedOrNewProduct.id)
      // setCurrentProducts([...editedProducts, editedOrNewProduct])
    } else { // we get here if we are not editing, but adding a new product instead
     // setCurrentProducts([...currentProducts, editedProducts]) // set the currentProducts in state equal an array made up of everything that was in currentProducts already, and the new product
     setCurrentProducts([...currentProducts, editedOrNewProduct])
    }
  }
  
  const handleDelete = (id) => {
    fetch(`${API}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(() => setCurrentProducts(currentProducts.filter(p => p.id !== id)))
  }

  const renderPage = (() => {
    if(!currentUser) {
      return <Home users={users} handleLogin={handleLogin} handleSignup={handleSignup} errors={errors}/>
    } else {
      return <UserHome
              handleLogin={handleLogin}
              currentUser={currentUser}
              currentProducts={currentProducts}
              handleProducts={handleProducts}
              handleDelete={handleDelete}
              getProducts={getProducts}
             />
    }
  })()

  return (
    <div className="App">
      {renderPage}
    </div>
  );
}

export default App;
