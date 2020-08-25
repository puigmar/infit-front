import React, { useState, useEffect } from 'react';
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

  let useEffectRounds = 0;

  useEffect(() => {
      authUser()
  }, [])

  const authUser = () => {
    auth()
      .then((user) => {
        console.log('petición de user desde auth(): ', user)
        if(user){
          setisLoggedin(true)
          setUser(user)
          setIsLoading(false)
        }
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
    user &&
      logout(user.isCoach)
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
    authUser
  };

  return <UserContext.Provider value={value} {...props} />;
}

const WithAuth = () => {
  const context = React.useContext(UserContext);
  return context;
};

export default WithAuth;
