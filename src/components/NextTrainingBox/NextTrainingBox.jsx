import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom'
import 'moment/locale/es';
import TimeTo from '../TimeTo/TimeTo';


function NextTrainingBox(props) {

  const {nextTraining, user} = props.training;

  console.log('training -------> ', props.training)
  
  const hour = moment(nextTraining.date).format('HH:MM');
  console.log(moment(nextTraining.date).format('YYYY-MM-DD, HH:MM'))

  return (
    <section className="nextBlock nextBlock--trainings">
        <div className="nextBlock_title">
          <h3>Próximo entreno</h3>
        </div>
        <Card>
          <Card.Body className="nextBlock_content">
            <div className="nextBlock_content_image">
              <span className="card-arrangeMeeting_image_avatar" style={{backgroundImage: `url("${user.avatarUrl}")`}}></span>
            </div>
            <div className="nextBlock_content_intro">
              <p>
                <span>Tienes entreno</span>
                <span>con {user.name}</span>
                <span>A las {hour}</span>
              </p>
            </div>
          </Card.Body>
          <Card.Footer className="nextBlock_resume">
            <dl>
              <dt>Ejercicio</dt>
              <dd>{nextTraining.title}</dd>
            </dl>
            <dl>
              <dt>Programa</dt>
              <dd>{nextTraining.programID.objective}</dd>
            </dl>
          </Card.Footer>
          <TimeTo date={nextTraining.date} title="Próximo entreno en"/>
        </Card>
    </section>
  )
}

export default NextTrainingBox
