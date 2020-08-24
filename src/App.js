import React from "react";

import './App.css'

import { Switch } from "react-router-dom";
import {AuthProvider} from "./services/AuthProvider";

import SignupClient from "./pages/SignupClient.jsx";
import Login from "./pages/Login";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import ClientDashboard from "./pages/DashboardClient.jsx";
import Header from "./components/Header/Header.jsx";
import {Container} from 'react-bootstrap'

function App() {
  return (
    <AuthProvider>
      <Header />
        <Container>
          <Switch>
            <AnonRoute exact path='/client/auth/signup' component={ SignupClient } />
            <AnonRoute exact path='/client/auth/login' component={ Login } />
            <PrivateRoute exact path='/client/auth/my-account/dashboard' component={ ClientDashboard } />
          </Switch>
        </Container>
    </AuthProvider>
  )
}

export default App;
