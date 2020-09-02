import React from 'react'
import { Card, Button } from 'react-bootstrap';
import './ArrangeMeetingBox.css';

function ArrangeMeetingBox() {
  return (
    <Card className="card-arrangeMeeting">
      <div className="card-icon">
        <span class="icon-arrangeMeeting"></span>
      </div>
      <Card.Body>
        <Card.Title>¡Tienes una cita pendiente!</Card.Title>
        <Card.Text>
          <strong>Recuerda que tu pack ya ha sido activado</strong> y tienes que pedir una cita para que te podamos asignar un entrenador.
        </Card.Text>
        <Button variant="secondary" size="md">Pedir Cita</Button>
      </Card.Body>
    </Card>
  )
}

export default ArrangeMeetingBox
