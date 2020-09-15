import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import WithAuth from './AuthProvider'
import { getTokenUser} from '../helpers/authHelpers';

function PrivateRoute({ component: Component, path }) {
  // devuelve un componente <Route /> donde su prop render recibe las props, y si está logueado, devuelve el componente con sus props (history, etc.), en caso contrario, el componente <Redirect /> redirige a /login
  const { isLoading, setIsLoading } = WithAuth();
  
  const [ user, setUser ] = useState({})
  const [ access, setAcess ] = useState(false)

  useEffect(() => {
    setUser(getTokenUser())
  }, [])

  useEffect(() => {
    if(Object.keys(user).length > 0) {
      console.log('existe usuario')
      setIsLoading(true)
    }
  }, [user])

  useEffect(() => {
    setAcess(true)
  }, [isLoading])

  return (
    Object.keys(user).length > 0 &&
    <Route path={path}
      render={(props) =>
        access ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
}

export default PrivateRoute;
