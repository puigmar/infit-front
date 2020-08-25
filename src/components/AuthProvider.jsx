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
  const [isLoggedin, setisLoggedin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const signupUser = (user) => {
    console.log(user);
    signup({ ...user })
      .then((user) => {
        console.log('user signup', user);
        getUser(user);
        setUser(user);
        setisLoggedin(true);
        setIsLoading(false);
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
    setIsLoading,
  };

  return <UserContext.Provider value={value} {...props} />;
}

const WithAuth = () => {
  const context = React.useContext(UserContext);
  return context;
};

export default WithAuth;
