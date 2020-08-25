import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div> 
      <h1>Home Page</h1>
      
      <Link to={'/client/auth/signup'}> Quiero enntrnar</Link>
      <Link to={'/client/auth/login'}> Ya entreno</Link>
      <Link to={'/coach/auth/signup'}> Quiero ser entrenador</Link>
      <Link to={'/coach/auth/login'}> Ya soy entrenador</Link>
    </div>
  )
}

export default Home;