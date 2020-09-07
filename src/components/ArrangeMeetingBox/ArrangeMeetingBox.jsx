import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import {filterByAvailability, filterByCallAvailability} from '../../services/user/user.service'
import { Card, Button } from 'react-bootstrap';
import ModalCalendar from '../ModalCalendar/ModalCalendar'

import './ArrangeMeetingBox.css';

function ArrangeMeetingBox(props) {

  const {clientInfo} = props;
  
  const [ show, setShow ] = useState(false);
  const [ availableCoachHours, setAvailableCoachHours ] = useState({})

  useEffect( ()=> {
    if(Object.keys(availableCoachHours).length !== 0){
      handleLaunchCalendar()
    }
  }, [availableCoachHours])

  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

  const handleChooseCoach = async () => {
    console.log('cliente-------------->', clientInfo)
    try{
      const coaches = await filterByAvailability(clientInfo.wizard.availability.min, clientInfo.wizard.availability.max);
      console.log('coaches ------>', coaches)
      const availability = await filterByCallAvailability(coaches);
      setAvailableCoachHours(availability);
    } catch(err){
      console.log(err)
    }
  }

  const handleLaunchCalendar = () => {
    handleOpen()
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

      <ModalCalendar handleOpen={handleOpen} handleClose={handleClose} show={show} availableCoachHours={availableCoachHours} />
  </Fragment>
  )
}

export default ArrangeMeetingBox
