import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import ProgramDetail from '../../pages/ProgramDetail'

function ClientPreview(props) {
  const { name, wizard, avatarUrl } = props;
  return (
    <div>
      <Card>
        <Card.Img variant='left' src={avatarUrl} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text></Card.Text>
          <Row>
            <Col>
              <Button variant='primary btn-outline-primary'>
                <Link
                to='/coach/auth/client/programDetail'
              >
                Crear programa a {name}
              </Link>
              </Button>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <small className='text-muted'>Objetivo: {wizard.objective}</small>
        </Card.Footer>
      </Card>
      <Card></Card>
    </div>
  );
}

export default ClientPreview;
