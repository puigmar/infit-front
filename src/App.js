import React from 'react';

import './App.css';

import { Switch } from 'react-router-dom';
import SignupCoach from './pages/SignupCoach.jsx';
import LoginCoach from './pages/LoginCoach.jsx';
import AnonRoute from './components/AnonRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import DashboardCoach from './pages/DashboardCoach.jsx';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home.jsx';
import { Container } from 'react-bootstrap';
import NewProgram from './pages/NewProgram.jsx'
import Exercises from './pages/Exercises.jsx'
import NewExercise from './pages/NewExercise'
import { AuthProvider } from './components/AuthProvider.jsx';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Container>
        <Switch>
          <AnonRoute exact path='/' component={Home} />
          <AnonRoute exact path='/coach/auth/signup' component={SignupCoach} />
          <AnonRoute exact path='/coach/auth/login' component={LoginCoach} />

          <PrivateRoute
            exact
            path='/coach/auth/my-account/dashboard'
            component={DashboardCoach}
          />
          <PrivateRoute
            exact
            path='/coach/auth/program'
            component={NewProgram}
          />
          <PrivateRoute
            exact
            path='/coach/auth/exercises'
            component={Exercises}
          />
          <PrivateRoute
            exact
            path='/coach/auth/newExercises'
            component={NewExercise}
          />
        </Switch>
      </Container>
    </AuthProvider>
  );
}

export default App;
