import React, { useState } from 'react';
import { Button, Card, ListGroupItem, ListGroup, Row, Col } from 'react-bootstrap';


function Exercise(props) {
  const { 
    _id, 
    title, 
    description, 
    image,
    url,
    rest, 
    handleAlertDeleteExercice, 
    handleModalEdition,
  } = props;

  return (

    <Card>
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Row>
          <Col><Button data-id={_id} variant='primary btn-outline-primary' onClick={ (e)=> handleAlertDeleteExercice(e)}>Eliminar</Button></Col>
          <Col><Button data-id={_id} variant='primary' onClick={ (e)=> handleModalEdition(e)}>Editar</Button></Col>
        </Row>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        <ListGroupItem>Descanso por serie</ListGroupItem>
        <ListGroupItem>Minutos: {rest && rest.minute}</ListGroupItem>
        <ListGroupItem>Segundos: {rest && rest.second}</ListGroupItem>
      </ListGroup>
    </Card>
  );
}

export default Exercise;
