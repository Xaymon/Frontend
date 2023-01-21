import React, {useState,useEffect} from 'react'
import { Avatar, Typography, Box, Grid, TextField, Button } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Profile(props) {
  const [id, setid] = useState("")
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios({
      url: 'http://localhost:5000/get/1',
      method: 'get'
    }).then(res => {
      console.log(res.data)
      setid((res.data[0].user_id))
      setfirstname(res.data[0].firstname)
      setlastname(res.data[0].lastname)
      setusername(res.data[0].username)
      setemail(res.data[0].email)
      setpassword(res.data[0].password)
    })
  }, [])

  const handleChangeFirstname = (e) => {
    setfirstname(e.target.value)
  }

  const handleChangeLastname = (e) => {
    setlastname(e.target.value)
  }

  const handleChangeUsername = (e) => {
    setusername(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setemail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setpassword(e.target.value)
  }

  const handleLogin = () => {
    navigate('/login')
  }


  const handleUpdateUser = () => {
    axios({
      url: 'http://localhost:5000/update',
      method: 'put',
      data: {
        user_id:id,
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password
      }
    }).then(res => {
      console.log(res.data)
    })
  }

  if(props.isLoggedIn) {
    return (
      <Box>
        <Box display='flex'>
          <Box width='20%' p={2}>
            <Avatar sx={{ width: 100, height: 100 }}>XXX</Avatar>
          </Box>
  
          <Box display='flex' flexDirection='column' justifyContent='center'>
            <Typography variant='h6'>John Doe</Typography>
            <Typography variant='body1' >a@b.com - Software Engineer</Typography>
            <Typography variant='caption' >Avatar by iam.com. or upload your own...</Typography>
          </Box>
  
        </Box>
  
        <Box p={2}>
          <Typography variant='body1' >Account</Typography>
        </Box>
  
        <Grid container spacing={2}>
          <Grid item sm={3} xs={12} display='flex' alignItems='center' justifyContent='center' >
            <Typography variant='body2'>Firstname</Typography>
          </Grid>
  
          <Grid item sm={9} xs={12}>
            <TextField value={firstname || ""} label='firstname' onChange={handleChangeFirstname} />
          </Grid>
  
          <Grid item sm={3} xs={12} display='flex' alignItems='center' justifyContent='center' >
            <Typography variant='body2'>Lastname</Typography>
          </Grid>
  
          <Grid item sm={9} xs={12}>
            <TextField value={lastname || ""} label='lastname' onChange={handleChangeLastname} />
          </Grid>
  
          <Grid item sm={3} xs={12} display='flex' alignItems='center' justifyContent='center' >
            <Typography variant='body2'>Username</Typography>
          </Grid>
  
          <Grid item sm={9} xs={12}>
            <TextField value={username || ""} label='username' onChange={handleChangeUsername} />
          </Grid>
  
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
            <TextField value={password || ""} label='password' onChange={handleChangePassword} />
          </Grid>
        </Grid>
  
        <Box p={2} display='flex' justifyContent='center'>
          <Button variant='contained' onClick={handleUpdateUser}>Update</Button>
        </Box>
        
      </Box>
    )
  } else {
    return (
      <div>
        Please Log In
        {/* <Navigate to='/login/' /> */}
        <button onClick={handleLogin}>Log In</button>
      </div>
    )
  }
}