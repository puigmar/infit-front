import React from 'react'
import {Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import WithAuth from '../AuthProvider'

const Header = () => {

  const { user, isLoggedin, logoutUser } = WithAuth();

  console.log('user --------->', user)
  console.log('isLoggedin --------->', isLoggedin)

  const configMenu = (userContext, isLogged) => {

    const baseUrl = (userContext && userContext.isCoach) ? '/coach' : '/client'
    const myAccountUrl = `${baseUrl}/auth/my-account`;
    const anonymUrl = `${baseUrl}/auth`;
    const clientLogin = `/client/auth/login`;
    const clientSignup = `/client/auth/signup`;
    const coachLogin = `/coach/auth/login`;
    const coachSignup = `/coach/auth/signup`;
    let menuList;

    const menuUser = [
      {
        name: 'Dashboard' ,
        link: `${myAccountUrl}/dashboard`
      },
      {
        name: 'Mi Cuenta' ,
        link: `${myAccountUrl}/profile`
      },
      {
        name: 'Cerrar sesión' ,
        action: logoutUser,
        link: './'
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
        name: 'Quiero entrenar' ,
        link: `${clientSignup}`
      },
      {
        name: 'Ya soy usuario' ,
        link: `${clientLogin}`
      },
      {
        name: 'Quiero ser entrenador' ,
        link: `${coachSignup}`
      },
      {
        name: 'Ya soy entrenador' ,
        link: `${coachLogin}`
      }
    ]
    
    if(!userContext){
      menuList = menuAnonymous
    } else {
      menuList = (userContext && userContext.isCoach) ? menuCoach : menuUser;
    }

    return menuList.map( (listItem, index) => {
      return (
        <Nav.Item>
          <Nav.Link href={listItem.link}>{listItem.name}</Nav.Link>
        </Nav.Item>
      )
    })
  }
  const logoutButtons = (userContext) => {
    switch(userContext.isCoach) {
      case false:
        return (<Nav.item>
          <Navbar.Link href="/coach/auth/logout">Cerrar sesión</Navbar.Link>
        </Nav.item>)
        break;
      
      case true:
        return (<Nav.item>
          <Navbar.Link href="/client/auth/logout">Cerrar sesión</Navbar.Link>
        </Nav.item>)
        break;
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
          <Nav
            activeKey="/home"
          >
            {
              configMenu(user, isLoggedin)
            }
          </Nav>
          {
            logoutButtons
          }
      </Container>
    </Navbar>
  )
}

export default Header
