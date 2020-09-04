import React, { Fragment, useState, useEffect } from 'react';
// import NextTraining from '../components/NextTraining.jsx';
import WithAuth from '../components/AuthProvider';
import { Link, useHistory } from 'react-router-dom';
import { getTokenUser } from '../helpers/authHelpers.js';
import { getIdClient } from '../services/user/user.service';
import { getIDInactiveProgram } from '../services/program/program.service';
import { nextMeeting } from '../services/meeting/meeting.service';
import UserIntro from '../components/UserIntro/UserIntro';
import SubHeader from '../components/SubHeader/SubHeader';
import ArrangeMeetingBox from '../components/ArrangeMeetingBox/ArrangeMeetingBox'
import MeetingAlertBox from '../components/MeetingAlertBox/MeetingAlertBox'


const DashboardClient = (props) => {

  const { setHeaderBackground } = WithAuth();
  const [userInfo, setUserInfo] = useState({})
  const [client, setClient] = useState({})
  const [meeting, setMeeting] = useState({})
  const [nextTraining, setNextTraining] = useState(false)

  let history = useHistory();

  const getClient = async (id, userInfo) => {
    try{
      //console.log('id del cliente: ---->', id)
      const clientService = await getIdClient(id)
      console.log('Client: --->:', clientService)
      setClient({
        ...clientService,
        isCoach: userInfo.isCoach
      })
    }
    catch(err){
      console.log(err)
    }
  }

  const handleMessagesProgram = async (userID) => {
    console.log('clientID -----> ', userID)
    try{
      const program = await getIDInactiveProgram(userID);
      console.log('program ---------->', program)
      if(program){
        checkMeeting(userID, program._id)
      } else {

      }
    }
    catch(err){
      console.log(err)
    }
  }

  const checkMeeting = async (userID, programID) => {
    const newMeeting = await nextMeeting(userID, programID)
    console.log('newMeeting: ----------->', newMeeting)
    if(newMeeting){
      setMeeting(newMeeting)
    }
  }

  const getData = async () => {
    const getToken = await getTokenUser();
    setUserInfo(getToken);
    await getClient(getToken._id, getToken);
  }

  useEffect(() => {
    getData()
    setHeaderBackground(true)
  }, []);

  useEffect (() => {
    handleMessagesProgram(client._id);
  }, [client])

  return (
    <Fragment>
      <div className="privateArea-page">
        <SubHeader title={'Tu Área Privada'} />
        <div className="home-section box-layout">
          { client && <UserIntro nexTraining={nextTraining} client={client} /> }
          { Object.keys(meeting).length !== 0 && !nextTraining
            ? <ArrangeMeetingBox clientInfo={client} />
            : <MeetingAlertBox />
          }
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardClient;
