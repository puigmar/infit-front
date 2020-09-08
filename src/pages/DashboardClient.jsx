import React, { Fragment, useState, useEffect } from 'react';
// import NextTraining from '../components/NextTraining.jsx';
import WithAuth from '../components/AuthProvider';
import { getTokenUser } from '../helpers/authHelpers.js';
import { getIdClient } from '../services/user/user.service';
import { getProgramByClientID } from '../services/program/program.service';
import { nextMeeting, updateMeeting } from '../services/meeting/meeting.service';
import UserIntro from '../components/UserIntro/UserIntro';
import SubHeader from '../components/SubHeader/SubHeader';
import ArrangeMeetingBox from '../components/ArrangeMeetingBox/ArrangeMeetingBox'
import MeetingAlertBox from '../components/MeetingAlertBox/MeetingAlertBox'

const DashboardClient = (props) => {

  const { setHeaderBackground } = WithAuth();
  const [ userInfo, setUserInfo ] = useState({})
  const [ client, setClient ] = useState({})
  const [ meeting, setMeeting ] = useState({})
  const [ showMeeting, setShowMeeting ] = useState(false)
  const [ nextTraining, setNextTraining ] = useState(false)
  const [ userProgram, setUserProgram ] = useState({})
  const [ sendDBMeeting, setSendDBMeeting] = useState({})

  const getClient = async (id, userInfo) => {
    try{
      const clientService = await getIdClient(id)
      console.log('clientService: --------->', clientService)
      setClient({
        ...clientService,
        isCoach: userInfo.isCoach
      })
    }
    catch(err){
      console.log(err)
    }
  }

  const getData = async () => {
    try{
      const getToken = await getTokenUser();
      setUserInfo(getToken);
      getClient(getToken._id, getToken);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
    setHeaderBackground(true)
  }, []);

  const getUserProgram = async (userID) => {
    try{
      const program = await getProgramByClientID(userID);
      setUserProgram(program);
      return program;
    } catch (err) {
      console.log(err)
    }
  }

  const handleMessagesProgram = async (userID) => {
    try{
      const program = await getUserProgram(userID);
      console.log('program initial date:', program)
      if(!program.initialDate){
        checkMeeting(userID, program._id)
      } else {
        
      }
    }
    catch(err){
      console.log(err)
    }
  }

  const checkMeeting = async (userID, programID) => {
    console.log(userID, programID)
    const newMeeting = await nextMeeting(userID, programID)
    console.log('new Meeting: ', newMeeting)
    if(newMeeting){
      console.log('meeting ------>', newMeeting)
      setMeeting(newMeeting)
    }
  }

  useEffect (() => {
    handleMessagesProgram(client._id);
  }, [client])


  const handleMeeting = async (calendarData) => {
    const {coachID, date} = calendarData;
    setSendDBMeeting({
      ...meeting,
      coachID,
      date,
      url: `/meeting-room/${client.userID}${coachID}`
    })
  }

  const handleMeetingMessages = () => {
    return !meeting.date
      ? <ArrangeMeetingBox clientInfo={client} handleMeeting={handleMeeting}/>
      : <MeetingAlertBox {...meeting} />
  }

  const udpdateDBMeeting = async () => {
    console.log('meeting: ', sendDBMeeting);
    const updateMeetingSession = await updateMeeting(sendDBMeeting)
    checkMeeting(userInfo._id, userProgram._id)
  }

  useEffect(() => {
    udpdateDBMeeting();
  }, [sendDBMeeting])

  return (
    <Fragment>
      <div className="privateArea-page">
        <SubHeader title={'Tu Área Privada'} />
        <div className="home-section box-layout">
          { client && <UserIntro nexTraining={nextTraining} client={client} /> }
          { Object.keys(meeting).length !== 0 && handleMeetingMessages() }
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardClient;
