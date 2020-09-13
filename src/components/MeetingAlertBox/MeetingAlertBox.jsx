import React from 'react'
import { Card } from 'react-bootstrap';
import moment from 'moment';
import './MeetingAlertBox.css'
import TimeTo from '../TimeTo/TimeTo';



function MeetingAlertBox({meeting, title}) {

  const {date, coachID, url} = meeting;

  return (
    <Card className="card-arrangeMeeting">
      <div className="card-arrangeMeeting_info">
        <div className="card-arrangeMeeting_image">
          <span className="card-arrangeMeeting_image_avatar" style={{backgroundImage: `url("${coachID.avatarUrl}")`}}></span>
        </div>
        <Card.Body>
          <p className="card-arrangeMeeting_title">
            <span>Tienes una reunión programada con <strong>{coachID.name}</strong></span>
            <span>A las {moment(date).format('HH:MM')}</span>
          </p>
        </Card.Body>
      </div>
      <TimeTo date={date} url={url} title={title}/>
      <a className="btn btn-primary" href={`${url}`}>Ir a la reunión</a>
    </Card>
  )
}

export default MeetingAlertBox
