import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  signup,
  login,
  logout,
  auth,
} from '../services/authenticate/auth-user.service'; // Importamos funciones para llamadas axios a la API
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
  const [provClientId, setProvClientId] = useState({})
  const [headerBackground, setHeaderBackground] = useState(true)

  useEffect(() => {
    if (!getToken()) {
      setIsLoading(false);
    } else {
      let userToken = getTokenUser();
      setUser(userToken);
      setIsLoading(true);
    }
  }, []);

  const signupUser = ({ user, client }) => {

    signup(user, client)
      .then((userSigned) => {
        setToken(uuidv4());
        setTokenUser(userSigned);
        setIsLoading(true);
        setUser(userSigned);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };
  const loginUser = ({ username, password, isCoach }) => {
    username &&
      login({ username, password, isCoach })
        .then((userLogged) => {
          setToken(uuidv4());
          setTokenUser(userLogged);
          setIsLoading(true);
          setUser(userLogged);
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
    provClientId, 
    setProvClientId,
    headerBackground,
    setHeaderBackground
  };
  return <UserContext.Provider value={value} {...props} />;
}
const WithAuth = () => {
  const context = React.useContext(UserContext);
  return context;
};
export default WithAuth;
