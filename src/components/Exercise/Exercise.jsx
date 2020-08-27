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

function Exercise(props) {
  const {
    _id,
    title,
    description,
    image,
    rest,
    reloadPage
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
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Row>
            <Col>
              <Button
                data-id={_id}
                variant='primary btn-outline-primary'
                onClick={() => handleShowAlertDelete()}
              >
                Eliminar
              </Button>
            </Col>
            <Col>
              <Button
                data-id={_id}
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

      {show && (
        <AlertMessage 
          id={_id} 
          show={show}
          setShow={setShow}
          isDelete={isDelete}
          title={title}
          reloadPage={reloadPage}
          />
      )}
    </>
  );
}

export default Exercise;
