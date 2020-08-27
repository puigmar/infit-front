import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  signup,
  login,
  logout,
  auth,
} from '../services/authenticate/auth-client.service'; // Importamos funciones para llamadas axios a la API

import { getUser } from '../services/user/user.service';

import {
  deleteToken,
  getToken,
  setToken,
  setTokenUser,
  getTokenUser,
  deleteTokenUser,
} from '../helpers/authHelpers';

const UserContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      setIsLoading(false);
      console.log('no hay token');
    } else {
      console.log('este es el token', getToken());
      //authUser()
      console.log('he pasado por el useeffect con este user', getTokenUser());
      let userToken = getTokenUser();
      console.log(userToken)
      setUser(userToken);
      console.log('he pasado por el useeffect con este userState', user);
      setIsLoading(true);
    }
  }, []);

  const authUser = async () => {
    auth()
      .then((authUser) => {
        console.log('petición de user desde auth(): ', authUser);
        console.log('He llegado hasta aquí');
        setUser(authUser);
        console.log('No llego hasta aquí');
      })
      .catch((err) => {
        setUser(null);
        setIsLoading(false);
      });
  };

  const signupUser = ({ user, client }) => {
    signup(user, client)
      .then((user) => {
        getUser(user);
        setUser(user);
        setTokenUser(user);
      })
      .catch(({ response }) => {
        return { message: response.data.statusMessage };
      });
  };

  const loginUser = ({ username, password, isCoach }) => {
    username &&
      login({ username, password, isCoach })
        .then((userLogged) => {
          console.log('user del login--->', userLogged);
          setToken(uuidv4());
          setTokenUser(userLogged);
          setIsLoading(true);
          console.log('setToken', getToken());
          setUser(userLogged);
          console.log('Seteado el userState');
          console.log(getTokenUser());
        })
        .catch((err) => {
          console.log(err);
          console.log('withAuth.login.err => ', err);
        });
  };

  const logoutUser = () => {
    user &&
      logout(user.isCoach)
        .then(() => {
          deleteToken();
          deleteTokenUser();
          setIsLoading(false);
          setUser(null);
        })
        .catch((err) => console.log(err));
  };

  const value = {
    loginUser,
    logoutUser,
    signupUser,
    user,
    isLoading,
    setIsLoading,
  };

  return <UserContext.Provider value={value} {...props} />;
}

const WithAuth = () => {
  const context = React.useContext(UserContext);
  return context;
};

export default WithAuth;
