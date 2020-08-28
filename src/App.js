import React from 'react';

import './App.css';

import { Switch } from 'react-router-dom';
import SignupCoach from './pages/SignupCoach.jsx';
import LoginCoach from './pages/LoginCoach.jsx';
import SignupClient from './pages/SignupClient.jsx';
import LoginClient from './pages/LoginClient.jsx';
import AnonRoute from './components/AnonRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import DashboardCoach from './pages/DashboardCoach.jsx';
import DashboardClient from './pages/DashboardClient.jsx';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import NewProgram from './pages/NewProgram.jsx'
import Exercises from './pages/Exercises.jsx'
import NewExercise from './pages/NewExercise.jsx'
import ArrangeMeetingPage from './pages/ArrangeMeetingPage.jsx'
import { AuthProvider } from './components/AuthProvider.jsx';
import ProgramDetail from './pages/ProgramDetail';

function App() {
  return (
    <AuthProvider>
      <Header />
      <div className="main-layout">
      <Container>
        <Row>
          <Col md={12}>
            <Switch>
              <AnonRoute exact path='/' component={Home} />
              <AnonRoute exact path='/client/auth/signup' component={SignupClient} />
              <AnonRoute exact path='/client/auth/login' component={LoginClient} />
              <AnonRoute exact path='/coach/auth/signup' component={SignupCoach} />
              <AnonRoute exact path='/coach/auth/login' component={LoginCoach} />
              <PrivateRoute
                exact
                path='/client/auth/my-account/dashboard'
                component={DashboardClient}
              />
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
              <PrivateRoute
                exact
                path='/coach/auth/client/programDetail'
                component={ProgramDetail}
              />
              <PrivateRoute exact path='/client/auth/arrange-meeting' component={ ArrangeMeetingPage } />
            </Switch>
          </Col>
        </Row>
      </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
