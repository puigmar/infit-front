import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import WithOut from './AuthProvider';
import { getToken } from '../helpers/authHelpers';

// El componente <AnonRoute /> recibe como argumento un objecto con las propiedades: component con el valor de un componente (Signup, Login), isLoggedin (viene de withAuth, ya que Signup se exporta como withAuth(Signup), y el resto de las props (si hubiera))

function AnonRoute({ component: Component }) {
  // devuelve un componente <Route /> donde su prop render recibe las props, y si no está logueado, devuelve el componente con sus props (history, etc.), en caso contrario, el componente <Redirect /> redirige a /private
  const { isLoading,setIsLoading, user} = WithOut();

  if (!getToken()) {
    setIsLoading(false);
    console.log('no hay token');
  }else{
    console.log('este es el token del AnonRoute', getToken());
    setIsLoading(true);
  }
  console.log('usuario del AnonRoute', user);
  let url = '/';

  if(user){
    url = `${user && user.isCoach ? '/coach' : '/client'}/auth/my-account/dashboard`
  }
  
  console.log(url)
  return (
    <Route
      render={(props) =>
        !isLoading ? (
          <Component {...props} />
        ) : 
        (
          <Redirect
            to={url}
          />
        )
      }
    />
  );
}

export default AnonRoute;
