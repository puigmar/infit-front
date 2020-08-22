import React from "react";
import { Link } from "react-router-dom";
import WithAuth from '../services/AuthProvider';

const Navbar = () =>{
  const { user, logoutUser, isLoggedin } = WithAuth();

  return (
      <nav className='navbar'>
        <Link to={"/"} id='home-btn'>
          <h4>Home</h4>
        </Link>
        {isLoggedin ? (
          <>
            <p className='navbar-user'>username: {user && user.username }</p>
            <button className='navbar-button' onClick={logoutUser}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/client/auth/login'>
              <button className='navbar-button'>Login</button>
            </Link>
            <br />
            <Link to='/client/auth/signup'>
              <button className='navbar-button'>Sign Up</button>
            </Link>
          </>
        )}
      </nav>
    );
}

export default Navbar;
