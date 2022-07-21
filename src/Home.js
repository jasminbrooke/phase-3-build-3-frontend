import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';

const Home = ({ handleLogin, handleSignup }) => {
    const [userName, setUserName] = useState('')
    const [displayName, setDisplayName] = useState('')
    
    const submitLogin = (e) => {
        e.preventDefault();
        handleLogin(userName)
    }

    const submitSignup = (e) => {
        e.preventDefault();
        handleSignup(userName, displayName)
    }

    return (
        <>
            <h1>Build a Business</h1>
            <form onSubmit={(e) => submitLogin(e)}>
                <TextField
                  id="outlined-basic"
                  label="Enter your username"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Button type="submit"> Log In</Button>
            </form>

            <form onSubmit={(e) => submitSignup(e)}>
                <TextField 
                    id="outlined-basic"
                    label="Enter your name"
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Create your username"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Button type="submit"> Sign Up</Button>
            </form>
        </>
    )
}

export default Home