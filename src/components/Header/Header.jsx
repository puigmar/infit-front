import React, { Fragment } from 'react'
import {Navbar, Nav, NavDropdown, Container, Col, Row} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import WithAuth from '../../lib/AuthProvider'


const Header = () => {

  const { user, isLoggedin } = WithAuth();

  const configMenu = (userContext, isLogged) => {

    const baseUrl = (userContext && userContext.isCoach) ? '/coach' : '/client'
    const myAccountUrl = `${baseUrl}/my-account`;
    const anonymUrl = `${baseUrl}/auth`;
    let menuList;

    const menuUser = [
      {
        name: 'Dashboard' ,
        link: `${myAccountUrl}/dashboard`
      },
      {
        name: 'Mi Cuenta' ,
        link: `${myAccountUrl}/profile`
      }
    ]

    const menuCoach = [
      {
        name: 'Dashboard' ,
        link: `${myAccountUrl}/dashboard`
      },
      {
        name: 'Mi cuenta' ,
        link: `${myAccountUrl}/profile`
      },
      {
        name: 'Mis clientes' ,
        link: `${myAccountUrl}/clients`
      }
    ]

    const menuAnonymous = [
      {
        name: 'Iniciar sesión' ,
        link: `${anonymUrl}/login`
      },
      {
        name: 'Registrarse' ,
        link: `${anonymUrl}/signup`
      }
    ]
    
    if(!userContext){
      menuList = menuAnonymous
    } else {
      menuList = (userContext && userContext.isCoach) ? menuCoach : menuUser;
    }

    return menuList.map( (listItem, index) =>
      (
        <LinkContainer key={index} to={listItem.link}>
          <Nav.Link>{listItem.name}</Nav.Link>
        </LinkContainer>
      )
    )
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            { 
              configMenu(user, isLoggedin)
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
