import React, { useState } from 'react';
import {
  Button,
  Card,
  ListGroupItem,
  ListGroup,
  Row,
  Col,
} from 'react-bootstrap';
import AlertMessage from '../AlertMessage/AlertMessage';
import AlertMessageEdit from '../AlertMessageEdit/AlertMessageEdit.jsx';
import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';

function Exercise(props) {
  const {
    _id,
    title,
    description,
    image,
    rest,
    getExercises,
    video,
  } = props;

  console.log('id por ejercicio',_id)

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
        <Card.Img variant='top' src={image} />
        <div className="wrapImage">
          {video &&    
            <Player
              playsInline
              src={video}
            /> 
          }
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Row>
            <Col>
              <Button
                variant='primary btn-outline-primary'
                onClick={() => handleShowAlertDelete()}
              >
                Eliminar
              </Button>
            </Col>
            <Col>
              <Button
                variant='primary'
                onClick={() => handleShowAlertEdit()}
              >
                Editar
              </Button>
            </Col>
          </Row>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem>Descanso por serie</ListGroupItem>
          <ListGroupItem>Minutos: {rest && rest.minute}</ListGroupItem>
          <ListGroupItem>Segundos: {rest && rest.second}</ListGroupItem>
        </ListGroup>
      </Card>

      {show &&
        isDelete ? (
        <AlertMessage 
          id={_id} 
          show={show}
          setShow={setShow}
          isDelete={isDelete}
          title={title}
          getExercises={getExercises}
          />
        ) : (
          <AlertMessageEdit
          {...props}
          show={show}
          setShow={setShow}
          isDelete={isDelete}
          title={title}
          getExercises={getExercises}
          />
        )
      
      }
    </>
  );
}

export default Exercise;
