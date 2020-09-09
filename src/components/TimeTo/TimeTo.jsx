import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom'
import 'moment/locale/es';
import './TimeTo.css'

function TimeTo({date, url, title}) {

  const [ countDown, setCountDown] = useState(false)
  const [ timmer, setTimmer] = useState('')
  const [ showMeetingBtn, setShowMeetingBtn ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)

  const futureMeetingDate = moment(date).locale('es').format('dddd, D/MM/YYYY');
  const futureHour = moment(date).locale('es').format('HH:MM');

  const checkDate = (date) => {

    const today = moment().format('YYYY-MM-DD')
    const meetingDay = moment(date).format('YYYY-MM-DD')

    if( today === meetingDay ){

      setCountDown(true)

      const countDown = setInterval( ()=> {
        
        let meetingDate = moment.utc(date);
        let dateNow = moment.utc();

        if(dateNow < meetingDate){

          let duration = meetingDate.diff(dateNow)
          let now = moment.utc(duration);

          let h = now.hour()
          let m = now.minute()
          let s = now.second()

          if(h < 10)  h = `0${h}`;
          if(m < 10)  m = `0${m}`;
          if(s < 10)  s = `0${s}`;

          let countdown = `${h}:${m}:${s}`;
          setTimmer(countdown)
          setIsLoading(false)
          
        } else {
          setShowMeetingBtn(true)
          setIsLoading(false)
          setCountDown(false)
          clearInterval(countDown)
        }
        
      }, 1000)

    } else {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkDate(date)
  }, [showMeetingBtn])

  const printFooter = () => {
    if(isLoading) return (
      <div className="spinner">
        <img src="/img/loader.svg"></img>
      </div>
    )

    if(countDown) return (
      <div>
        <p>{title}</p>
        <span>{timmer}</span>
      </div>
    )

    if(showMeetingBtn) return (
      <Link className="btn btn-primary" to={url}>Ir a la reunión</Link>
    )

    if(!countDown && !showMeetingBtn) 
      return (
        <span>{futureMeetingDate} <br></br>a las {futureHour}</span>
      )
  }

  return (
    <div className={`timeToBlock ${!countDown && !showMeetingBtn ? 'futureMeeting' : ''}`}>
      {
        printFooter()
      }
    </div>
  )
}

export default TimeTo
