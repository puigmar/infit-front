import React, { useState } from 'react';
import {
  signup,
  login,
  logout,
} from '../services/authenticate/auth-client.service'; // Importamos funciones para llamadas axios a la API

const UserContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoggedin, setisLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const signupUser = (user) => {
    console.log(user);
    signup({ ...user })
      .then((user) => {
        console.log('user signup', user);
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
        setisLoggedin(true);
        setIsLoading(false);
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
