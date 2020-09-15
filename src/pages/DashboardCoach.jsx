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
      if(theTraining) {
        setNextTraining([theTraining])
      }

    } catch(err){
      console.log(err)
    }
  }

  const getNextMeeting = async (userID) => {
    try {
      const theMeeting = await nextCoachMeeting(userID);
      console.log('userID: ', userID)
      console.log('Hay Meetings?: ', theMeeting)
      if(theMeeting.meeting.length !== 0){
        setNextMeeting([theMeeting])
      }

    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    setHeaderBackground(true)
    getCoach(coach);
  }, []);

  useEffect(() => {
    //getTheNextTraining(coach._id)
    getNextMeeting(coach._id)
  }, [coach])

  return (
    <Fragment>
      <div className="privateArea-page">
        <SubHeader title={'Tu Área Privada'} />
        <div className="box-layout home-section box-layout dashboard-coach">
          { coach && <UserIntro nextTraining={nextTraining} client={coach} message={'Este es tu próximo entrenamiento'} /> }
          {
            Object.keys(nextTraining).length !== 0 && nextTraining.map( (training, index) => <NextTrainingBox key={index} training={training} />)
          }
          {
            nextMeeting.length !== 0 && nextMeeting.map( (meeting, index) => <NextMeetingBox key={index} nextMeeting={nextMeeting} />)
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