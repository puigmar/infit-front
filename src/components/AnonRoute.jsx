import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import WithOut from './AuthProvider';

// El componente <AnonRoute /> recibe como argumento un objecto con las propiedades: component con el valor de un componente (Signup, Login), isLoggedin (viene de withAuth, ya que Signup se exporta como withAuth(Signup), y el resto de las props (si hubiera))

function AnonRoute({ component: Component }) {
  // devuelve un componente <Route /> donde su prop render recibe las props, y si no está logueado, devuelve el componente con sus props (history, etc.), en caso contrario, el componente <Redirect /> redirige a /private
  const { isLoggedin, user} = WithOut();

  return (
    <Route
      render={(props) =>
        isLoggedin === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={`${
              user && user.isCoach ? '/coach' : '/client'
            }/auth/my-account/dashboard`}
          />
        )
      }
    />
  );
}

export default AnonRoute;
