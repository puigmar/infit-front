import React, { useEffect, useState, Fragment } from 'react';
import { getUser, } from '../services/user/user.service';
import { getCoachNextTraining } from '../services/training/training.service'
import { nextCoachMeeting } from '../services/meeting/meeting.service'
import { Link } from 'react-router-dom';
import { getTokenUser } from '../helpers/authHelpers.js';
import WithAuth from '../components/AuthProvider';
import UserIntro from '../components/UserIntro/UserIntro';
import SubHeader from '../components/SubHeader/SubHeader';
import NextTrainingBox from '../components/NextTrainingBox/NextTrainingBox';
import NextMeetingBox from '../components/NextMeetingBox/NextMeetingBox';


const DashboardClient = (props) => {

  const { setHeaderBackground } = WithAuth();

  const [ nextMeeting, setNextMeeting ] = useState([])
  const [ coach, setCoach ] = useState(getTokenUser());
  const [ nextTraining, setNextTraining ] = useState([])

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      console.log('coach: ', coach)
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getTheNextTraining = async (coachID) => {
    console.log('coach: ', coach)
    try {
      const theTraining = await getCoachNextTraining(coachID);
      console.log(theTraining)
      setNextTraining([theTraining])

    } catch(err){
      console.log(err)
    }
  }

  const getNextMeeting = async (userID) => {
    try {
      const theMeeting = await nextCoachMeeting(userID);
      console.log('the Meeting ------------>', theMeeting)
      setNextMeeting([theMeeting])

    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    setHeaderBackground(true)
    getCoach(coach);
  }, []);

  useEffect(() => {
    getTheNextTraining(coach._id)
    getNextMeeting(coach._id)
  }, [coach])

  return (
    <Fragment>
      <div className="privateArea-page">
        <SubHeader title={'Tu Área Privada'} />
        <div className="box-layout home-section box-layout dashboard-coach">
          { coach && <UserIntro nextTraining={nextTraining} client={coach} message={'Este es tu próximo entrenamiento'} /> }
          {
            nextTraining.map(training => <NextTrainingBox training={training} />)
          }
          {
            nextMeeting.map(meeting => <NextMeetingBox nextMeeting={nextMeeting[0]} />)
          }
        </div>
      </div>
      <nav className="bottom-menu">
          <Link to={'/coach/auth/program'} >Nuevo programa</Link>
          <Link to={'/coach/auth/exercises'} >Ejercicios</Link>
          <Link to={'/coach/auth/newExercises'} >Crea ejercicios</Link>
      </nav>
    </Fragment>
  );
};

export default DashboardClient;