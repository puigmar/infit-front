import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  signup,
  login,
  logout,
  auth,
} from '../services/authenticate/auth-client.service'; // Importamos funciones para llamadas axios a la API

import { getUser } from '../services/user/user.service';

import { deleteToken, getToken, setToken } from '../helpers/authHelpers';
import { Redirect } from 'react-router';

// initAxiosInterceptors()

const UserContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function cargarUsuario() {
    if (!getToken) {
      setIsLoading(false);
      console.log('no hay token');
      return;
    }

    if (user) {
      const usuario = await auth().then(({ user }) => user);

      console.log('Usuario token me', usuario);
      setUser(usuario);
      login({ ...user })
        .then((user) => {
          console.log(
            'AuthPovider EFFECT: loginUser prevSetUser ----->: ',
            user
          );
          setUser(user);
          console.log('AuthPovider EFFECT: loginUser ----->: ', user);
          setToken(uuidv4());
          setIsLoading(true);
          console.log('loggin EFFECT --->', isLoading);
        })
        .catch((err) => {
          console.log(err);
          console.log('withAuth.login.err => ', err);
        });
    }
  }

  useEffect(() => {
    console.log('PASO DE TU CARA');
    console.log('este es el token', getToken());
    if (!getToken()) {
      setIsLoading(false);
      console.log('no hay token');
    } else {
      authUser();
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
    console.log('user ----->: ', user);
    console.log('client ----->: ', client);
    signup(user, client)
      .then((user) => {
        console.log('user signup', user);
        getUser(user);
        setUser(user);
      })
      .catch(({ response }) => {
        return { message: response.data.statusMessage };
      });
  };

  const loginUser = ({ username, password, isCoach }) => {
    username &&
      login({ username, password, isCoach })
        .then((user) => {
          console.log('AuthPovider: loginUser prevSetUser ----->: ', user);
          setUser(user);
          console.log('AuthPovider: loginUser ----->: ', user);
          setToken(uuidv4());
          setIsLoading(true);
          console.log('PATATA');
          console.log('isLoading --->', isLoading);
        })
        .catch((err) => {
          console.log(err);
          console.log('withAuth.login.err => ', err);
        });
  };

  const logoutUser = () => {
    console.log('user logout ---->:', user);
    user &&
      logout(user.isCoach)
        .then(() => {
          deleteToken();
          setIsLoading(false);
          setUser(null);
          console.log('loggout --->', isLoading);
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
