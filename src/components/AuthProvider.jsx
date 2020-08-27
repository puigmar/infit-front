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
const UserContext = React.createContext();
export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log('PASO DE TU CARA');
    console.log('este es el token', getToken());
    if (!getToken()) {
      setIsLoading(false);
      console.log('no hay token');
    } else {
      setIsLoading(true)
      console.log('soy el primero');
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
    signup(user, client)
      .then((user) => {
        getUser(user);
        setUser(user);
      })
      .catch(({ response }) => {
        console.log(response)
      });
  };
  const loginUser = ({ username, password, isCoach }) => {
    username &&
      login({ username, password, isCoach })
        .then((user) => {
          setUser(user);
          setToken(uuidv4());
          setIsLoading(true);
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