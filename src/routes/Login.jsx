import React, { useState } from 'react'
import { Typography, Box, Grid, TextField, Button } from '@mui/material';
import axios from 'axios'
import {Navigate, useNavigate} from 'react-router-dom'

export default function Login(props) {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = () => {
        axios({
            url: 'http://localhost:5000/login',
            method: 'post',
            data: {
                email: email,
                password: password
            },
            withCredentials: true
        }).then(res => {
            console.log(res.data)
            if(res.data.status === 200) {
                props.setisLoggedIn(true)
                navigate('/')
            } else {
                console.log("Failed")
            }
        })
    }

    const handleChangeEmail = (e) => {
        setemail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setpassword(e.target.value)
    }
    if(!props.isLoggedIn) {
        return (
            <Box p={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <Grid container>
                    <Grid item sm={3} xs={12} display='flex' alignItems='center' justifyContent='center' >
                        <Typography variant='body2'>Email</Typography>
                    </Grid>
    
                    <Grid item sm={9} xs={12}>
                        <TextField value={email || ""} label='email' onChange={handleChangeEmail} />
                    </Grid>
    
                    <Grid item sm={3} xs={12} display='flex' alignItems='center' justifyContent='center' >
                        <Typography variant='body2'>Password</Typography>
                    </Grid>
    
                    <Grid item sm={9} xs={12}>
                        <TextField value={password || ""} label='password' onChange={handleChangePassword} type='password' />
                    </Grid>
                    <Grid item sm={9} xs={12} display='flex' alignItems='center' justifyContent='center'>
                        <Button variant='contained' onClick={handleLogin}>Login</Button>
                    </Grid>
                </Grid>
            </Box>
        )
    } else {
        return (
            <div>
                <Navigate to='/' />
            </div>
        )
    }
    
}