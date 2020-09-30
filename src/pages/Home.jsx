import React from 'react'
import { Link } from 'react-router-dom';
import widhAuth from '../components/AuthProvider'
import { Container, Row, Col } from 'react-bootstrap';

function Home() {

  const { setHeaderBackground } = widhAuth()
  setHeaderBackground(true)
  return (
    <div className="home-page">
      <section className="hero">
        <Container>
          <Row>
            <Col>
              <h1><span>Tu casa,</span><span>tu gimnasio</span></h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="home-page_client fullSection">
        <Container>
          <Row>
            <Col>
              <Link className="btn btn-secondary" to={'/client/auth/signup'}> Quiero entrenar </Link>
              <Link to={'/client/auth/login'}> Ya soy usuario</Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="home-page_coach fullSection coach bg-coach">
        <Container>
          <Row>
            <Col>
              <Link className="btn btn-light" to={'/coach/auth/signup'}> Quiero ser entrenador</Link>
              <Link to={'/coach/auth/login'}> Ya soy entrenador</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home;