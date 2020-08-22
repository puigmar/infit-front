import React from "react";

import './App.css'

import { Switch } from "react-router-dom";
import {AuthProvider} from "./lib/AuthProvider";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import ClientDashboard from "./components/ClientDashboard";
import Header from "./components/Header/Header";

function App() {
  return (
    <AuthProvider>
      <Header />
      <div className='container'>
        <Navbar />
        <Switch>
          <AnonRoute exact path='/client/auth/signup' component={Signup} />
          <AnonRoute exact path='/client/auth/login' component={Login} />
          <PrivateRoute exact path='/client/auth/my-account/dashboard' component={ClientDashboard} />
        </Switch>
      </div>
    </AuthProvider>
  )
}

export default App;
