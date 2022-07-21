import React, { useState } from 'react'
import Home from './Home'
const API = 'http://localhost:9292'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (userName) => {
    console.log(userName)

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
    }
  })()

  return (
    <div className="App">
      {renderPage}
    </div>
  );
}

export default App;
