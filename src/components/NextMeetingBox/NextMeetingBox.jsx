import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom'
import 'moment/locale/es';
import TimeTo from '../TimeTo/TimeTo';


function NextMeetingBox({nextMeeting}) {
  console.log('nextMeeting ----------------------> ', nextMeeting)
  let { meeting, user } = nextMeeting;
  meeting = meeting[0];
  
  const hour = moment(meeting.date).format('HH:MM');
  console.log('meeting details: --------------->', meeting[0])
  return (
    <section class="nextBlock nextBlock--meeting">
      <div class="nextBlock_title">
        <h3>Próxima cita</h3>
        <Card>
          <Card.Body className="nextBlock_content">
            <div className="nextBlock_content_image">
              <span className="card-arrangeMeeting_image_avatar" style={{backgroundImage: `url("${user.avatarUrl}")`}}></span>
            </div>
            <div className="nextBlock_content_intro">
              <p>
                <span>Tienes cita</span>
                <span>con {user.name}</span>
                <span>A las {hour}</span>
              </p>
            </div>
          </Card.Body>
          <TimeTo date={meeting.date} url={meeting.url} title="Próxima cita en"/>
        </Card>
      </div>
    </section>
  )
}

export default NextMeetingBox
