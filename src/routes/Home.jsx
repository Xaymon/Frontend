import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Home(props) {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login')
  }

  if (props.isLoggedIn) {
    return (
      <div>Home</div>
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