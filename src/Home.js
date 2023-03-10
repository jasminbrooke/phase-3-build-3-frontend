import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Home = ({ users, handleLogin, handleSignup, errors }) => {
    const [userName, setUserName] = useState('')
    const [displayName, setDisplayName] = useState('')
    
    // const submitLogin = (e) => {
    //     e.preventDefault();
    //     handleLogin(userName)
    // }

    const submitSignup = (e) => {
        e.preventDefault();
        handleSignup(userName, displayName)
    }

    const renderUsers = () => {
        return (<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            {
                users.map(user => 
                    <Card key={user.id} onClick={() => handleLogin(user.id)}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            {user.displayname}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            }
        </Box>)
    }

    return (
        <>
            <h1>Build a Business</h1>
            {/* <form onSubmit={(e) => submitLogin(e)}>
                <TextField
                  error={errors.login}
                  id="outlined-error"
                  label="Enter your username"
                  helperText={errors.login}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Button type="submit"> Log In</Button>
            </form> */}
            <form onSubmit={(e) => submitSignup(e)}>
                <TextField
                    error={errors.displayname}
                    id="outlined-error"
                    label="Enter your name"
                    helperText={errors.displayname?.[0]}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <TextField
                  error={errors.username}
                  id="outlined-error"
                  label="Create your username"
                  helperText={errors.username?.[0]}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Button type="submit"> Sign Up</Button>
            </form>
            {renderUsers()}
        </>
    )
}

export default Home