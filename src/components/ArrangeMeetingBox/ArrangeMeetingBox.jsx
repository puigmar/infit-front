import React, { useState, Fragment } from 'react'
import { Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar'

import SubHeader from '../SubHeader/SubHeader'

import './ArrangeMeetingBox.css';

function ArrangeMeetingBox(props) {
  
  const [show, setShow] = useState(false);
  const [value, onChange] = useState(new Date());

  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

  const handleChooseCoach = async () => {
    try{

      

    } catch(err){
      console.log(err)
    }
  }

  return (
    <Fragment>
      <Card className="card-arrangeMeeting">
        <div className="card-icon">
          <span className="icon-arrangeMeeting"></span>
        </div>
        <Card.Body>
          <Card.Title>¡Tienes una cita pendiente!</Card.Title>
          <Card.Text>
            <strong>Recuerda que tu pack ya ha sido activado</strong> y tienes que pedir una cita para que te podamos asignar un entrenador.
          </Card.Text>
          <Button variant="secondary" size="md" onClick={() => handleChooseCoach() }>Pedir Cita</Button>
        </Card.Body>
      </Card>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className="fullScreen modal-arrangeMeeting"
    >
    <SubHeader title={'Pedir Cita'} action={() => handleClose()} />
    <Modal.Body>
        <div className="meetingCalendar">
          <Calendar
            onChange={onChange}
            value={value}
          />
        </div>
        {/* <Link to="/client/auth/my-account/dashboard"><Button variant="primary">Quiero ir a mi cuenta</Button></Link> */}
      </Modal.Body>
    </Modal>
  </Fragment>
  )
}

export default ArrangeMeetingBox
