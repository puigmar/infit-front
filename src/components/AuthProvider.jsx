import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  signup,
  login,
  logout,
  auth
} from '../services/authenticate/auth-client.service'; // Importamos funciones para llamadas axios a la API

import { getUser } from '../services/user/user.service';

import { deleteToken, getToken, setToken, initAxiosInterceptors} from '../helpers/authHelpers';

const UserContext = React.createContext();

initAxiosInterceptors();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoggedin, setisLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isLogout, setIsLogout] = useState(false)

  useEffect(() => {
    async function cargarUsuario () {
      if(!getToken){
        setIsLoading(false);
        console.log('no hay token')
        return;
      }

      try {
        const { data: usuario } = await Axios.get('/generic/auth/me');
        console.log('Usuario token me', usuario)
        setUser(usuario);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    cargarUsuario();
  }, [])


  useEffect(() => {
      authUser()
  }, [])

  const authUser = () => {
    auth()
      .then((user) => {
        console.log('petición de user desde auth(): ', user)
        if(user !== 'undefined'){
          console.log('Usuario del me', user);
          const { username , isCoach } = user;
          login( {username, password: '*', isCoach} )
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


          // setisLoggedin(true)
          // setUser(user)
          // setIsLoading(false)
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
  };

  return <UserContext.Provider value={value} {...props} />;
}

const WithAuth = () => {
  const context = React.useContext(UserContext);
  return context;
};

export default WithAuth;