import React, { useState } from 'react'
import Home from './Home'
import UserHome from './UserHome'
import './App.css'

const API = 'http://localhost:9292'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentProducts, setCurrentProducts] = useState([])

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
      setCurrentUser(data.user)
      setCurrentProducts(data.products)
    })
  }

  const handleSignup = (userName, displayName) => {
    console.log(userName, displayName)
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
    .then(data => setCurrentUser(data))
  }

  const handleProducts = (data) => setCurrentProducts([ ...currentProducts, data ])

  const handleDelete = (id) => {
    fetch(`${API}/product/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    })
    .then(() => setCurrentProducts(currentProducts.filter(p => p.id !== id )))
  }

  const renderPage = (() => {
    if(!currentUser) {
      return <Home handleLogin={handleLogin} handleSignup={handleSignup}/>
    } else {
      return <UserHome
              currentUser={currentUser}
              currentProducts={currentProducts}
              handleProducts={handleProducts}
              handleDelete={handleDelete}
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
