import React from "react";
import "./App.css";

import { Switch } from "react-router-dom";
import {AuthProvider} from "./services/AuthProvider";

import Navbar from "./components/Navbar.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import AnonRoute from "./components/AnonRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import DashboardClient from "./pages/DashboardClient.jsx";

function App() {
  return (
    <AuthProvider>
      <div className='container'>
        <Navbar />
        <Switch>
          <AnonRoute exact path='/client/auth/signup' component={Signup} />
          <AnonRoute exact path='/client/auth/login' component={Login} />
          <PrivateRoute exact path='/client/auth/my-account/dashboard' component={DashboardClient} />
        </Switch>
      </div>
    </AuthProvider>
  )
}

export default App;
