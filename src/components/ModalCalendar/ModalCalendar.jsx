import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import SubHeader from '../SubHeader/SubHeader'
import { Card, Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

function ModalCalendar({show, handleClose, availableCoachHours}) {

  const [value, onChange] = useState(new Date());
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    setAvailability(availableCoachHours)
  }, [availableCoachHours])

  useEffect(() => {
    handleSchedule();
  }, [value])

  const handleSchedule = () => {
    const date = moment(value).format('YYYY-MM-DD')
    console.log(availability)
  }

  return (
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
  )
}

export default ModalCalendar
