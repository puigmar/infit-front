import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  signup,
  login,
  logout,
  auth
} from '../services/authenticate/auth-client.service'; // Importamos funciones para llamadas axios a la API

import { getUser } from '../services/user/user.service';

const UserContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoggedin, setisLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogout, setIsLogout] = useState(false)

  useEffect(() => {
    return () => {
      auth()
    }
  }, [isLoggedin, []])

  const authUser = () => {
    auth()
      .then((user) => {
        console.log('datos del user: ', user)
        // setisLoggedin(true);
        // setIsLoading(false);
        // setIsLogout(false)
      })
      .catch((err) => {
        console.log(err);
        console.log('withAuth.login.err => ', err);
      })
      .catch((err) => {
        setUser(null)
        setisLoggedin(false)
        setIsLoading(false)
      }
      );
  }
  
  const signupUser = ({user, client}) => {
    console.log('user ----->: ', user);
    console.log('client ----->: ', client);
    signup(user, client)
      .then((user) => {
        console.log('user signup', user);
        getUser(user)
        setUser(user);
        setisLoggedin(true);
        setIsLoading(false);
        setIsLogout(false)
      })
      .catch(({ response }) => {
        return { message: response.data.statusMessage };
      });
  };

  const loginUser = ({ username, password, isCoach }) => {
    login({ username, password, isCoach })
      .then((user) => {
        console.log('AuthPovider: loginUser prevSetUser ----->: ', user);
        setUser(user);
        console.log('AuthPovider: loginUser ----->: ', user);
        setisLoggedin(true);
        setIsLoading(false);
        setIsLogout(false)
      })
      .catch((err) => {
        console.log(err);
        console.log('withAuth.login.err => ', err);
      });
  };

  const logoutUser = () => {
    console.log('user logout ---->:', user)

      logout()
        .then(() => {
          setisLoggedin(false);
          setUser(null);
          setIsLoading(true);
          setIsLogout(true)
        })
        .catch((err) => console.log(err));
  };

  const value = {
    loginUser,
    logoutUser,
    signupUser,
    user,
    isLoggedin,
    isLoading,
    isLogout,
    setIsLoading,
  };

  return <UserContext.Provider value={value} {...props} />;
}

const WithAuth = () => {
  const context = React.useContext(UserContext);
  return context;
};

export default WithAuth;