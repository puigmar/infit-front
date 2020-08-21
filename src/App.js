import React from "react";
import "./App.css";

import { Switch } from "react-router-dom";
import {AuthProvider} from "./lib/AuthProvider";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logged from "./pages/Logged";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import ClientDashboard from "./components/ClientDashboard";

function App() {
  return (
    <AuthProvider>
      <div className='container'>
        <Navbar />
        <Switch>
          <AnonRoute exact path='/client/signup' component={Signup} />
          <AnonRoute exact path='/login' component={Login} />
          <PrivateRoute exact path='/client/my-account/dashboard' component={ClientDashboard} />
        </Switch>
      </div>
    </AuthProvider>
  )
}

export default App;
