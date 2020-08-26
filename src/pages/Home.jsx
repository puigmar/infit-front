import React from 'react'
import { Link } from 'react-router-dom';
import widhAuth from '../components/AuthProvider'

function Home() {

  const {user, isLoggedin, isLogout} = widhAuth()

  return (
    <div> 
      <h1>Home Page</h1>
      
      <Link to={'/coach/auth/signup'}> Quiero ser entrenador</Link>
      <Link to={'/coach/auth/login'}> Ya soy entrenador</Link>
    </div>
  )
}

export default Home;