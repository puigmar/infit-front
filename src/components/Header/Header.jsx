import React, {useEffect} from 'react'
import {Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import WithAuth from '../AuthProvider'

const Header = () => {

  const { user, isLoggedin, logoutUser } = WithAuth();

  console.log('user --------->', user)
  console.log('isLoggedin --------->', isLoggedin)

  useEffect (()=>{
    const navMenuBtn = document.querySelectorAll('.navbar-toggler');
    console.log('navMenuBtn: ', navMenuBtn)
    navMenuBtn.forEach(button => {
      button.addEventListener('click', handleMenu);
    })
  }, [])


  const handleMenu = (e) => {

    const el = e.currentTarget;
    const toggleId = el.getAttribute('data-toggle');
    const menu = document.getElementById(toggleId)
    menu.classList.toggle('show')
  }

  const configMenu = (userContext, isLogged) => {

    const baseUrl = (userContext && userContext.isCoach) ? '/coach' : '/client'
    const myAccountUrl = `${baseUrl}/auth/my-account`;
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
      },
      {
        name: 'Cerrar sesión' ,
        action: logoutUser,
        link: '/'
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
      },
      {
        name: 'Cerrar sesión' ,
        action: logoutUser,
        link: '/'
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

    return menuList.map( (listItem, index) => {
      return (
        <LinkContainer key={index} to={listItem.link}>
          <Nav.Link onSelect={listItem.action}>{listItem.name}</Nav.Link>
        </LinkContainer>
      )
    }

    )
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="logo"><img src="/img/logo.svg"></img></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="offcanvas-collapse_btnClose" data-toggle="offcanvas" onClick={(e)=>handleMenu(e)} />
        <Navbar.Collapse id="basic-navbar-nav" className="offcanvas-collapse" id="offcanvas">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="offcanvas-collapse_btnClose" data-toggle="offcanvas" onClick={(e)=>handleMenu(e)} />
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
