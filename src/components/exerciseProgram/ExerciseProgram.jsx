import React, { useState } from 'react';
import {
  Button,
  Card,
  ListGroupItem,
  ListGroup,
  Row,
  Col,
} from 'react-bootstrap';
import '../../../node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';
import AlertDeleteExercise from '../alertsProgram/AlertDeleteExercise';
import AlertEditExercise from '../alertsProgram/AlertEditExercise';

function ExerciseProgram(props) {
  const {
    _id,
    title,
    description,
    image,
    rest,
    series,
    repetition,
    video
  } = props;

  const [isDelete, setIsDelete] = useState(false); // chancge content alert
  const [show, setShow] = useState(false);

  const handleShowAlertEdit = () => {
    setIsDelete(false);
    setShow(!show);
  };
  const handleShowAlertDelete = () => {
    setIsDelete(true);
    setShow(!show);
  };

  return (
    <>
      <Card>
        <Card.Img variant='top' src={image} alt={title} />
        <div className='wrapImage'>
          {video && <Player playsInline src={video} />}
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Row>
            <Col>
              <Button variant='primary' onClick={() => handleShowAlertEdit()}>
                Editar
              </Button>
            </Col>
            <Col>
              <Button
                variant='primary btn-outline-primary'
                onClick={() => handleShowAlertDelete()}
              >
                Eliminar
              </Button>
            </Col>
          </Row>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem>Series: {series}</ListGroupItem>
          <ListGroupItem>Repeticiones: {repetition}</ListGroupItem>
          <ListGroupItem>Descanso por serie</ListGroupItem>
          <ListGroupItem>Minutos: {rest && rest.minute}</ListGroupItem>
          <ListGroupItem>Segundos: {rest && rest.second}</ListGroupItem>
        </ListGroup>
      </Card>

      {show && isDelete ? (
        <AlertDeleteExercise
          {...props}
          show={show}
          setShow={setShow}
        />
      ) : (
        <AlertEditExercise
          {...props}
          show={show}
          setShow={setShow}
        />
      )}
    </>
  );
}

export default ExerciseProgram;
