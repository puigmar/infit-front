import React, { useState } from 'react';
import { Button, Card, ListGroupItem, ListGroup, Row, Col, Modal } from 'react-bootstrap';


function Exercise(props) {
  const { 
    _id, 
    title, 
    description, 
    image,
    url,
    rest, 
    handleAlertDeleteExercice, 
    handleClose, 
    handleDelete,
    handleShowEdition,
    show 
  } = props;

  return (
    <Modal className="modal-exercise-detail" show={show}>
      <Modal.Header closeButton onClick={(e) => handleClose(e)}>
        <Modal.Title>Eliminar Ejercicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-exercise_img">
          <img src={url} alt={title} />
        </div>
        <h3>{title}</h3>
        <p>¿Estás seguro que quieres eliminar este ejercicio?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
        <Button variant="secondary" onClick={() => handleDelete(_id)}>Borrar</Button>
        <Button variant="primary" onClick={() => handleShowEdition(_id)}>Borrar</Button>
      </Modal.Footer>
    </Modal>
  )
  return (

    <Card>
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Row>
          <Col><Button data-id={_id} variant='primary btn-outline-primary' onClick={ (e)=> handleAlertDeleteExercice(e)}>Eliminar</Button></Col>
          <Col><Button data-id={_id} variant='primary' onClick={ (e)=> handleShowEdition(e)}>Editar</Button></Col>
        </Row>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        <ListGroupItem>{rest && rest.minutes}</ListGroupItem>
        <ListGroupItem>{rest && rest.seconds}</ListGroupItem>
      </ListGroup>
    </Card>
  );
}

export default Exercise;
