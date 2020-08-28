import React from 'react'
import { Link } from 'react-router-dom';
import widhAuth from '../components/AuthProvider'

function Home() {

  const {user, isLoggedin, isLogout} = widhAuth()

  return (
    <div className="home-page">
      <section className="hero">
        <h1><span>Tu casa,</span><span>tu gimnasio</span></h1>
      </section>
      <section className="home-page_client fullSection">
        <Link className="btn btn-secondary" to={'/client/auth/signup'}> Quiero entrenar </Link>
        <Link to={'/client/auth/login'}> Ya soy usuario</Link>
      </section>
      <section className="home-page_coach fullSection coach bg-coach">
        <Link className="btn btn-light" to={'/coach/auth/signup'}> Quiero ser entrenador</Link>
        <Link to={'/coach/auth/login'}> Ya soy entrenador</Link>
      </section>
    </div>
  )
}

export default Home;