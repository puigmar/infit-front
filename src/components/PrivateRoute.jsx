import React from "react";
import { Route, Redirect } from "react-router-dom";
import WithAuth from './AuthProvider'
import { getTokenUser} from '../helpers/authHelpers';

function PrivateRoute({ component: Component, path }) {
  // devuelve un componente <Route /> donde su prop render recibe las props, y si está logueado, devuelve el componente con sus props (history, etc.), en caso contrario, el componente <Redirect /> redirige a /login
  const { isLoading, setIsLoading } = WithAuth();
  let user = getTokenUser();

  if(user){
    setIsLoading(true)
  }

  console.log('isLoading ----------->', isLoading)

  return (
    <Route path={path}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
}

export default PrivateRoute;
