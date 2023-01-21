import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Home'
import Profile from './Profile'
import Login from './Login'
import axios from 'axios'

function Index() {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    useEffect(() => {
      axios({
        url: 'http://localhost:5000/isLoggedIn',
        method: 'POST',
        withCredentials: true
      }).then(res => {
        console.log(res.data)
        if(res.data.status === 200) {
            setisLoggedIn(true)
        }
      })
    }, [])
    
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />
                    <Route path='/profile' element={<Profile isLoggedIn={isLoggedIn} />} />
                    <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Index