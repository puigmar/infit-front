import React, {useEffect} from 'react'
import {Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import WithAuth from '../AuthProvider'

const Header = () => {

  const { user, isLoading, logoutUser } = WithAuth();

  useEffect (()=>{
    const navMenuBtn = document.querySelectorAll('.navbar-toggler');
    navMenuBtn.forEach(button => {
      button.addEventListener('click', handleMenu);
    })
  }, [])


  const handleMenu = (e) => {
    const el = e.currentTarget;
    const toggleId = el.getAttribute('data-toggle');
    const menu = document.getElementById(toggleId)
    console.log(menu)
    menu.classList.toggle('show')
  }


  useEffect (()=>{
    const navMenuBtn = document.querySelectorAll('.navbar-toggler');
    console.log('navMenuBtn: ', navMenuBtn)
    navMenuBtn.forEach(button => {
      button.addEventListener('click', handleMenu);
    })
  }, [])

  const configMenu = (userContext, isLogged) => {

    let menuList;

    const menuCoach = [
      {
        name: 'Dashboard' ,
        link: `/coach/auth/my-account/dashboard`
      },
      {
        name: 'Mi cuenta' ,
        link: `/coach/auth/my-account/profile`
      },
      {
        name: 'Mis clientes' ,
        link: `/coach/auth/my-account/Clients`
      }
    ]

    const menuAnonymous = [
      {
        name: 'Iniciar sesión' ,
        link: `/coach/auth/login`
      },
      {
        name: 'Registrarse' ,
        link: `/coach/auth/signup`
      }
    ]
    
    if(!userContext){
      menuList = menuAnonymous
    } else {
      menuList = menuCoach;
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
              configMenu(user, isLoading)
            }
            {isLoading ? <a onClick={logoutUser} className="nav-link" role="button">Cerrar sesión</a> : ''}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
