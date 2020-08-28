import React, { Fragment, useState } from 'react';
import NextTraining from '../components/NextTraining.jsx';
import WithAuth from '../components/AuthProvider';
import { getTraining } from '../services/training/training.service';
import { Modal, Form, Button, Accordion, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const DashboardClient = (props) => {
  const { user, isLoggedin, isLogout } = WithAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log('USER----->', user)
  // const trainings = getTraining({...user})
  // console.log('entrenamientos del usuario', trainings)

  const handleMeetingCalendar = () => {
  }

  return (
    <Fragment>
    <section className="box-layout">
      <h1>Hola {}</h1>
      
      <NextTraining />

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

    </section>

    </Fragment>
  );
};

export default DashboardClient;
