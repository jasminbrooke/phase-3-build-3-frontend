import React, { useState } from 'react'
import Home from './Home'
import UserHome from './UserHome'
const API = 'http://localhost:9292'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (userName) => {
    fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({username: userName })
    })
    .then(r => r.json())
    .then(data => setCurrentUser(data))
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

  const renderPage = (() => {
    if(!currentUser) {
      return <Home handleLogin={handleLogin} handleSignup={handleSignup}/>
    } else {
      return <UserHome currentUser={currentUser}/>
    }
  })()

  return (
    <div className="App">
      {renderPage}
    </div>
  );
}

export default App;
