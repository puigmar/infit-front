import React from 'react'
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/es';
import './MeetingAlertBox.css'



function MeetingAlertBox({date, coachID}) {  
  const meetingDate = moment(date).locale('es').format('dddd, D/MM/YYYY');
  const hour = moment(date).locale('es').format('HH:MM');
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
      <Card.Footer>
        <span>{meetingDate} <br></br>a las {hour}</span>
      </Card.Footer>
      
    </Card>
  )
}

export default MeetingAlertBox
