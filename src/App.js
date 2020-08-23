import React from 'react';

import './App.css';

import { Switch } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider.jsx';

import SignupClient from './pages/SignupClient.jsx';
import SignupCoach from './pages/SignupCoach.jsx';
import LoginClient from './pages/LoginClient.jsx';
import LoginCoach from './pages/LoginCoach.jsx';
import AnonRoute from './components/AnonRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import DashboardClient from './pages/DashboardClient.jsx';
import Header from './components/Header/Header.jsx';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Container>
        <Switch>
          <AnonRoute exact path='/client/auth/signup' component={SignupClient} />
          <AnonRoute exact path='/client/auth/login' component={LoginClient} />
          <AnonRoute exact path='/coach/auth/signup' component={SignupCoach} />
          <AnonRoute exact path='/coach/auth/login' component={LoginCoach} />
          <PrivateRoute
            exact
            path='/client/auth/my-account/dashboard'
            component={DashboardClient}
          />
        </Switch>
      </Container>
    </AuthProvider>
  );
}

export default App;
