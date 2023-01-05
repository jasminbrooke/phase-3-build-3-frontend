import React, { useState } from 'react'
import Home from './Home'
import UserHome from './UserHome'
import './App.css'

const API = 'http://localhost:9292'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentProducts, setCurrentProducts] = useState([])
  const [errors, setErrors] = useState({})

  const handleLogin = (userName) => {
    fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({username: userName })
    })
    .then(r => r.json())
    .then(data => {
      if(data.error) {
        setErrors(data.error)
      } else {
        setCurrentUser(data.user)
        setCurrentProducts(data.products)
      }
    })
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
        setCurrentUser(data)
      }
    })
  }

  const handleProducts = (data) => setCurrentProducts([...currentProducts.filter(p => p.id !== data.id), data])

  const handleDelete = (id) => {
    fetch(`${API}/product/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    })
    .then(() => setCurrentProducts(currentProducts.filter(p => p.id !== id )))
  }

  const renderPage = (() => {
    if(!currentUser) {
      return <Home handleLogin={handleLogin} handleSignup={handleSignup} errors={errors}/>
    } else {
      return <UserHome
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
