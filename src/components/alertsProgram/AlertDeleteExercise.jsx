import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const AlertDeleteExercise = (props) => {
  const {
    title,
    image,
    _id,
    show,
    setShow,
    newTraining,
    setNewTraining,
  } = props;

  const handleClose = () => {
    setShow(false);
  };

  const handleToDo = () => {
    // hay que eliminar por otro valor o borrará todos los que tengan este id
    console.log('Este el el id que voy a eliminar', _id)
    setNewTraining(newTraining.filter((training) => training._id !== _id));
    setShow(false);
    console.log('Este el el newTraining', newTraining)
  };

  console.log('_id del alert edit', _id);

  return (
    <Modal className='modal-alert-delete' show={show}>
      <Modal.Header closeButton onClick={(e) => handleClose(e)}>
        <Modal.Title>
          Eliminar {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>{title}</h3>
        <p>¿Estás seguro que quieres eliminar este ejercicio?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => handleClose()}>
          Close
        </Button>
        <Button variant='primary' onClick={() => handleToDo()}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertDeleteExercise;
