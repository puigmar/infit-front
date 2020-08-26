import React from "react";
import { Route, Redirect } from "react-router-dom";
import WithAuth from './AuthProvider'
// El componente <PrivateRoute /> recibe como props un objecto con las propiedades: component con el valor de un componente (Private), isLoggedin (viene de withAuth, ya que Private se exporta como withAuth(Private), y el resto de las props (si hubiera))

function PrivateRoute({ component: Component }) {
  // devuelve un componente <Route /> donde su prop render recibe las props, y si está logueado, devuelve el componente con sus props (history, etc.), en caso contrario, el componente <Redirect /> redirige a /login
  const { isLoggedin, user } = WithAuth();

  return (
    <Route
      render={(props) =>
        isLoggedin || user ? <Component /> : <Redirect to={'/'} />
      }
    />
  );
}

export default PrivateRoute;
