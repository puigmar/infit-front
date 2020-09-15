import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { getTokenUser } from '../helpers/authHelpers.js';
import { getUserInfo, getIdClient } from '../services/user/user.service'
import { getProgramByID } from '../services/program/program.service'
import { getMeeting } from '../services/meeting/meeting.service';

import SubHeader from '../components/SubHeader/SubHeader';
import WebCam from '../components/WebCam/WebCam.jsx';

const ArrangeMeetingPage = (props) => {

  let history = useHistory()
  const WEEKDAYS = [1,2,3,4,5,6]
  const ENDPOINT = "http://localhost:4000";
  const io = require('socket.io-client');
  const socket = io(ENDPOINT);

  const [ userToken, setUserToken ] = useState(getTokenUser())
  const [ userInfo, setUserInfo ] = useState({})
  const [ value, onChange] = useState(new Date())
  const [ selectedDate, setSelectedDate] = useState(false)
  const [ show, setShow] = useState(false)
  const [ meeting, setMeeting] = useState({})
  const [ program, setProgram] = useState([])
  const [ clientInfo, setClientInfo ] = useState([])
  const [ newProgram, setNewProgram ] = useState([])
  const [ room, setRoom] = useState('')
  const [ isLoadingSchedules, setIsLoadingSchedules] = useState(true)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  
  const handleRecieveProgramData = (socket) => {
    if(!userToken.isCoach){
      //console.log('recibiendo datos!')
      socket.on('receiveProgramData', data => {
        //console.log(data.newProgram[0].timeTables.length > 0)
        if(data.newProgram[0].timeTables.length > 0){
          //console.log(data.newProgram[0])
          setNewProgram([data.newProgram[0]])
          data.newProgram[0].initialDate && setSelectedDate(true)
        }
      })
    }
  }

  handleRecieveProgramData(socket)


  useEffect(() => {
    setSelectedDate(true)
    handleinitialDay(value)
    handleClose();
  }, [value])

  // 1
  useEffect(() => {
    setSelectedDate(false)
    setUserToken(getTokenUser())
    return () => socket.disconnect;
  }, [])

  // 2
  useEffect(() => {
    handleUserInfo(userToken._id);
  }, [userToken])

  const handleUserInfo = async (userID) => {
    const getUser = await getUserInfo(userID)
    //console.log('GET USER --------->', getUser)
    setUserInfo(getUser);
  }

  // 3
  useEffect( () => {
    if(Object.keys(userInfo).length > 0) {
      //console.log('Hay datos en userInfo')
      getTheMeetingDetails()
    }
  }, [userInfo])

  const getTheMeetingDetails = async () => {
    let meetingID = props.match.params.room;
    const theMeeting = await getMeeting(meetingID);
    //console.log('theMeeting: --------->', theMeeting)
    if(theMeeting){
      setMeeting(theMeeting)
    }
  }

  // 4
  useEffect(() => {
    if(Object.keys(meeting).length > 0) {
      //console.log('program petition')
      getProgram(meeting.programID);
    }
  }, [meeting])

  const getProgram = async (programID) => {
    const programDetails = await getProgramByID(programID)
    if(programDetails){
      setProgram([programDetails])
    }
  }

  // 5
  useEffect(() => {
    if(Object.keys(userInfo).length > 0) {
      getClientInfo()
      handleConnect(socket)
    }
  }, [program])

  const getClientInfo = async () => {
    const client = await getIdClient(meeting.userID);
    //console.log('CLIENT ------------>', client)
    setClientInfo([client])
  }

  // 6
  useEffect(() => {
    if(clientInfo.length > 0){
      addAvailability(clientInfo[0].wizard.trainningDays)
    }
  }, [clientInfo])

  const addAvailability = async (schedules) => {
    let timeTables = []
    schedules.map( (weekDay, index) => {
      let weekDays = WEEKDAYS.map( (day, index) => {
        
        if(day === Number(weekDay)) {
          timeTables.push({ 
            weekDay: day,
            hour: clientInfo[0].wizard.availability.min
          })
        }
      })
    })

    const newProgramObj = {
      ...program[0],
      timeTables
    }

    setNewProgram([newProgramObj])
  }

  // 7
  useEffect(() => {
    handleRecieveProgramData(socket)
    if(newProgram.length > 0) {   
      handleEmitProgramData(socket)
      setIsLoadingSchedules(true)
    }
  }, [newProgram])

  const availabilityHours = (availability, index) => {
    let availabilityOptions = []
    for(let i = availability.min; i < availability.max; i++){
      availabilityOptions.push(<option key={i} value={i}>{i} a {i+1}h</option>)
    }
    return availabilityOptions
  }

  const weekDays = timeTable => 
    WEEKDAYS.map( (day, index) => {
      let selectedDay = false;
      selectedDay = day === Number(timeTable.weekDay) && 'selected'
      return <option key={index} selected={ selectedDay } value={day}>{moment().day(day).format('dddd')}</option>
    })

  const handleAvailability = (e) => {
    if(newProgram.length > 0) {
      const index = e.target.getAttribute('data-index');
      const {name, value } = e.target;
      let timetablesArr = newProgram[0].timeTables;
      timetablesArr[index][name] = Number(value)

      const newProgramObj = {
        ...newProgram[0],
        timeTables: timetablesArr
      }
      handleRecieveProgramData(socket)
      setNewProgram([newProgramObj])
    }
  }

  const handleinitialDay = (date) => {
    if(newProgram.length > 0) {
      const initialDate = moment(date).format('YYYY-MM-DD')
      const newProgramObj = {
        ...newProgram[0],
        initialDate
      }
      handleRecieveProgramData(socket)
      setNewProgram([newProgramObj])
    }
  }

  const handleEmitProgramData = (socket) => {
    if(userToken.isCoach){
      console.log('enviando datos!!')
      socket.emit('sendProgramData', {newProgram})
    }
  }

  const handleConnect = (socket) => {
    let roomID = `${meeting.userID}_${meeting.coachID}`
    socket.emit('connectToRoom', {roomID});
    socket.on('joinedToRoom', () => {
      console.log(`Te has unido a la room ${roomID}`)
      setRoom(roomID);
    })
  }
    
  return (
    <div className="meeetingConfirmation-page">
      <SubHeader title={'Confirmación de servicio'} history={history} />
      <WebCam />
      
      <div className="resume-program box-layout">
        { 
          program.map( (programData, idex) => (
            <section key={idex} className="resume-program_details">
              <div className="resume-program_block">
                <dl className="resume-program_duration">
                  <dt className="h6">Duración</dt>
                  <dd>{programData.pack.duration} días</dd>
                </dl>
                <dl className="resume-program_objective">
                  <dt className="h6">Objetivos</dt>
                  <dd>{programData.objective}</dd>
                </dl>
              </div>
              <div className="resume-program_block resume-program_block--weekSesion">
                <h3 className="resume-program_schedules h6">Sesiones semanales</h3>
                <ul className="resume-program_schedules_trainningDays">
                  { newProgram.length > 0 &&
                    newProgram[0].timeTables.map( (timeTable, index) => {
                      const disabledSelect = !userInfo.userID.isCoach;
                      return (
                        <li key={index}>
                            <div className="weekDay">
                              <select data-index={index} name="weekDay" onChange={(e) => handleAvailability(e)} disabled={disabledSelect}>
                                {weekDays(timeTable)}
                              </select>
                            </div>
                            <div className="weekDayHour">
                              <select value={Number(newProgram[0].timeTables[index].hour)} data-index={index} name="hour" onChange={(e) => handleAvailability(e)} disabled={disabledSelect}>
                                {availabilityHours(clientInfo[0].wizard.availability, index)}
                              </select>
                            </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              
            </section>
            )
          )
        }
        <section className="resume-program_initialDay">
          <div className="h6">
          <label>Fecha de inicio:</label>
          {
            Object.keys(userInfo).length > 0 &&
            userInfo.userID.isCoach
            ? (
            <InputGroup className="mb-3">
              <FormControl
                name="initialDate"
                value={ selectedDate ? moment(value).format('dddd, DD-MM-YYYY') : ''}
                readOnly={true}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={()=> handleShow()}>Seleccionar</Button>
              </InputGroup.Append>
            </InputGroup>
            )
            : ( <FormControl
                name="initialDate"
                value={ selectedDate && newProgram.length > 0 ? moment(newProgram[0].initialDate).format('dddd, DD-MM-YYYY') : '' }
                readOnly={true}
              />)
          }
          
          </div>
          
          {/* Modal */}
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="fullScreen modal-arrangeMeeting"
          >
            <Modal.Body className="meetingCalendar">
              <Calendar
                onChange={onChange}
                value={value}
                minDate={new Date()}
              />
            </Modal.Body>
          </Modal>

        </section>
        {
          userToken && userToken.isCoach && 
          ( 
            <div className="meeetingConfirmation-page_SaveBtn">
              <Button size="lg">Confirmar</Button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ArrangeMeetingPage;
