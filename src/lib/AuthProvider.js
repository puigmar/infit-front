import React, { useState, useEffect } from 'react';
import auth from './auth-service'; // Importamos funciones para llamadas axios a la API

const userContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoggedin, setisLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth
      .me()
      .then((user) => {
        setUser(user);
        setisLoggedin(true);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const signup = (user) => {
    const { username, password } = user;

    auth
      .signup({ username, password })
      .then((user) => {
        setUser(user);
        setisLoggedin(true);
      })
      .catch(({ response }) => {
        return { message: response.data.statusMessage };
      });
  };

  const login = (user) => {
    const { username, password } = user;
    auth
      .login({ username, password })
      .then((user) => {
        setisLoggedin(true);
        setUser(user);
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    auth
      .logout()
      .then(() => {
        setisLoggedin(false);
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  const value = {
    login,
    logout,
    signup,
    user,
    isLoggedin,
    isLoading,
  };

  return <userContext.Provider value={value} {...props}></userContext.Provider>;
}

const WithAuth = () => {
  const context = React.useContext(userContext);
  return context;
};

export default WithAuth;
