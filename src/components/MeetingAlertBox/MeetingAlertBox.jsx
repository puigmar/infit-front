import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom'
import 'moment/locale/es';
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
            Tienes una reunión programada con <span>{coachID.name}</span>
          </p>
        </Card.Body>
      </div>
      <TimeTo date={date} url={url} title={title}/>
    </Card>
  )
}

export default MeetingAlertBox
