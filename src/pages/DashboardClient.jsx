import React, { Fragment, useState, useEffect } from 'react';
// import NextTraining from '../components/NextTraining.jsx';
import WithAuth from '../components/AuthProvider';
import { Modal, Button } from 'react-bootstrap';
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

  const { provClientId } = WithAuth();
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({})
  const [client, setClient] = useState({})
  const [meeting, setMeeting] = useState({})
  const [nextTraining, setNextTraining] = useState(false)

  let history = useHistory();

  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

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

  const handleMessagesProgram = async (clientID) => {
    console.log('clientID -----> ', clientID)
    try{
      const program = await getIDInactiveProgram(clientID);
      console.log('program ---------->', program)
      if(program){
        checkMeeting(clientID, program._id)
      } else {

      }
    }
    catch(err){
      console.log(err)
    }
  }

  const checkMeeting = async (clientID, programID) => {
    const newMeeting = await nextMeeting(clientID, programID)
    console.log('newMeeting: ----------->', newMeeting)
    if(newMeeting){
      setMeeting(newMeeting)
    }
  }

  const getData = async () => {
    const getToken = await getTokenUser();
    setUserInfo(getToken);
    //console.log('getToken:', getToken)
    await getClient(getToken._id, getToken);
  }

  useEffect(() => {
    getData()
  }, []);

  useEffect (() => {
    handleMessagesProgram(client._id);
  }, [client])

  const handleMeetingCalendar = () => {
  }

  return (
    <Fragment>
      <div className="privateArea-page">
        <SubHeader title={'Tu Área Privada'} />
        <div className="home-section box-layout">
          { client && <UserIntro nexTraining={nextTraining} client={client} /> }
          { Object.keys(meeting).length !== 0 && !nextTraining
            ? <ArrangeMeetingBox />
            : <MeetingAlertBox />
          }
          
          {/* Meeting Calendar */}
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="fullScreen payment-confrmation"
          >
          <Modal.Body>
              <div className="box box-skew">
                <div className="modal-highlightedTitle">
                  <p>Tu pago de {props.totalAmount}€ se ha realizado correctamente.</p>
                </div>
                <div className="mt-3">
                  <p><strong>Para que podamos asignarte el mejor entrenador</strong>, necesitamos que pidas cita para poder acordar tu programa</p>
                  <Button variant="secondary" onClick={()=>handleMeetingCalendar()}>Pedir cita</Button>
                </div>
              </div>
              <div className="meetingCalendar">

              </div>
              <Link to="/client/auth/my-account/dashboard"><Button variant="primary">Quiero ir a mi cuenta</Button></Link>
            </Modal.Body>
          </Modal>

        </div>
      </div>
    </Fragment>
  );
};

export default DashboardClient;
