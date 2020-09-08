import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import SubHeader from '../SubHeader/SubHeader'
import { Button, Modal, Form } from 'react-bootstrap';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './ModalCalendar.css';

function ModalCalendar({show, handleClose, availableCoachHours, allAvailableCoaches, handleMeeting}) {

  const [value, onChange] = useState(new Date());
  const [availability, setAvailability] = useState({});
  const [showHours, setShowHours] = useState(false);
  const [availableCoach, setAvailableCoach] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const [allCoaches, setAllCoaches] = useState({})
  const [disabledButton, setDisabledButton] = useState(true)

  useEffect(() => {
    setAvailability(availableCoachHours)
    setAllCoaches(allAvailableCoaches)
  }, [availableCoachHours, allAvailableCoaches])

  useEffect(() => {
    handleSchedule();
  }, [value])

  const closeHourSelector = () => setShowHours(false);
  const openHourSelector = () => setShowHours(true);

  const coachFullAvailableTimeTable = () => {
    const availaveSchedule = [...Array(24).keys()];
    return availaveSchedule.slice(9, availaveSchedule.length);
  }

  const handleSchedule = () => {
    const date = moment(value).format('YYYY-MM-DD')
    Object.keys(availability).length !== 0 && openHourSelector()
    Object.keys(availability).length !== 0 && displayHours(date)
  }

  const filterByMostAvailable = (date) => {
    const availableCoachTimeTable = availability[date];
    return availableCoachTimeTable.sort((a,b) => a.horario_libre.length > b.horario_libre.length)[0];
  }

  const randomAvailableCoach = () => {
    return {
      id: allCoaches[Math.floor(Math.random() * (allCoaches.length-1))]._id,
      horario_libre: coachFullAvailableTimeTable()
    }
  }

  const displayHours = async (date) => {
    const selectedDate = date;
    setSelectedDate({day: date})
    let availableCoachTimeTable = [];
    if(availability[selectedDate]){
      availableCoachTimeTable = filterByMostAvailable(selectedDate);
    } else {
      availableCoachTimeTable = randomAvailableCoach();
    }
    setAvailableCoach(availableCoachTimeTable)
  }

  const displayHoursOptions = () => {
    return availableCoach.horario_libre.map( (hours, index) => (<option key={index} value={hours}>De {hours}h a {hours+1}h</option>))
  }

  const confirmMeeting = () => {
    const {day, hour} = selectedDate;

    const calendarChooseData = {
      coachID: availableCoach.id,
      date: `${selectedDate.day} ${selectedDate.hour}`
    }

    handleMeeting(calendarChooseData)
  }

  const handleSelectHour = (e) => {
    let hourValue =  e.target.value;
    console.log('hourValue: ', hourValue);

    if(hourValue == 0){
      setDisabledButton(true)
      return;
    } else {
      setDisabledButton(false)
    }

    if(hourValue < 10) hourValue = `0${hourValue}`
    setSelectedDate({
      ...selectedDate,
      hour: `${hourValue}:00`
    })
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
    <Modal.Body className="meetingCalendar">
          <Calendar
            onChange={onChange}
            value={value}
            minDate={new Date()}
          />

          <div className={`meetingCalendar_availableHours ${showHours ? 'show' : ''}`}>
            <Button variant="secondary" className="btn-close" onClick={() => closeHourSelector()}><span className="icon-close"></span></Button>
            <div className="meetingCalendar_availableHours_intro">
              <span className="icon-calendar"></span>
              <p className="meetingCalendar_availableHours_title">Estas son las horas disponibles para <span>el {moment(value).format('DD-MM-YYYY')}</span></p>
            </div>
            
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Control as="select" onChange={(e) => handleSelectHour(e)}>
                <option value="0">Escoge una hora disponible</option>
                {availableCoach.length !== 0 && displayHoursOptions()}
              </Form.Control>
            </Form.Group>
            <Button disabled={disabledButton} variant="secondary" className="mt-3" onClick={() => confirmMeeting()}>Reservar cita</Button>
          </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalCalendar
