import React, { useState } from 'react';
import auth from './auth-service'; // Importamos funciones para llamadas axios a la API

const UserContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoggedin, setisLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /*useEffect(() => {
    auth
      .me()
      .then((user) => {
        setUser(user);
        setisLoggedin(true);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);*/

  const signup = (user) => {
    console.log(user)
    auth
      .signup({...user})
      .then((user) => {
        console.log('user signup', user)
        setUser(user);
        setisLoggedin(true);
        setIsLoading(false)
      })
      .catch(({ response }) => {
        return { message: response.data.statusMessage };
      });
  };

  const login = (username, password) => {

    auth
      .login({ username, password })
      .then((user) => {
        console.log('withAuth.login => ', user)
        setisLoggedin(true);
        setUser(user);
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        console.log('withAuth.login.err => ', err)
      })
  };

  const logout = () => {

    auth
      .logout(user.isCoach)
      .then(() => {
        setisLoggedin(false);
        setUser(null);
        setIsLoading(true);
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

  return <UserContext.Provider value={value} {...props} />;
}

const WithAuth = () => {
  const context = React.useContext(UserContext);
  return context;
};

export default WithAuth;
