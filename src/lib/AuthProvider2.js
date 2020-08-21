import React, {useState, createContext, useEffect, useMemo, useContext } from "react";
import auth from "./auth-service"; // Importamos funciones para llamadas axios a la API

const userContext = createContext();

export function AuthProvider(props) {
  
  const [user, setUser] = useState(null)
  const [isLoggedin, setisLoggedin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect( ()=> {
    auth
      .me()
      .then((user) =>
        this.setState({ isLoggedin: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({ isLoggedin: false, user: null, isLoading: false })
      );
  }, []);

  const signup = (user) => {
    const { username, password } = user;

    auth
      .signup({ username, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch(({ response }) =>
        this.setState({ message: response.data.statusMessage })
      );
  };
  
  const login = (user) => {
    const { username, password } = user;
    auth
      .login({ username, password })
      .then((user) => {
        setisLoggedin(true)
        setUser(user)
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    auth
      .logout()
      .then(() => {
        setisLoggedin(false)
        setUser(null)
      })
      .catch((err) => console.log(err));
  };

  const value = useMemo( () => {
    return ({
      login,
      logout,
      signup,
      user,
      isLoggedin,
      isLoading
    })
  }, [user, isLoggedin, isLoading])

  return <userContext.Provider value={value} {...props}></userContext.Provider>
  
}

export function withAuth() {
    const context = useContext(userContext)
    return context;
};