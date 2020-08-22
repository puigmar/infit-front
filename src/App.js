import React from "react";
import "./App.css";

import { Switch } from "react-router-dom";
import {AuthProvider} from "./components/AuthProvider.jsx";

import Navbar from "./components/Navbar.jsx";
import Signup from "./pages/Signup.jsx";
import LoginClient from "./pages/LoginClient.jsx";
import LoginCoach from "./pages/LoginCoach.jsx";
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
          <AnonRoute exact path='/client/auth/login' component={LoginClient} />
          <AnonRoute exact path='/coach/auth/signup' component={Signup} />
          <AnonRoute exact path='/coach/auth/login' component={LoginCoach} />
          <PrivateRoute exact path='/client/auth/my-account/dashboard' component={DashboardClient} />
        </Switch>
      </div>
    </AuthProvider>
  )
}

export default App;
