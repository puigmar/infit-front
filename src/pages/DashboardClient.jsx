import React, { Fragment, useState, useEffect } from 'react';
// import NextTraining from '../components/NextTraining.jsx';
import WithAuth from '../components/AuthProvider';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { getTokenUser } from '../helpers/authHelpers.js';
import { getIdClient } from '../services/user/user.service';

const DashboardClient = (props) => {
  const { provClientId } = WithAuth();
  const [show, setShow] = useState(false);
  const [client, setClient] = useState(getTokenUser())


  const getClient = async (id) => {
    try{
      console.log('id del cliente: ---->', id)
      const clientService = await getIdClient(id)
      setClient(clientService)
      console.log('Client: --->:', client)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    client && getClient(client._id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  console.log('CLIENT----->', client)
  // const trainings = getTraining({...user})
  // console.log('entrenamientos del usuario', trainings)

  const handleMeetingCalendar = () => {
  }

  return (
    <Fragment>
      <h1>Hola {client.name}</h1>
{/*       
      <section>

      </section>
      <NextTraining /> */}

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

    </Fragment>
  );
};

export default DashboardClient;
