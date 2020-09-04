import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteExerciseByID } from '../../services/exercise/exercise.service';
import { Link } from 'react-router-dom';
import WithAuth from '../AuthProvider';


const AlertMessage = (props) => {
  const { user } = WithAuth();
  const { title, image, id, isDelete, show, setShow, getExercises } = props;

  const handleClose = () => {
    setShow(false);
  };

  const deleteExercises = async (exerciseID) => {
    try {
      await deleteExerciseByID(exerciseID);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToDo = (id) => {
    if (isDelete) {
      console.log('Este es el id del objeto a borrar', id);
      deleteExercises(id);
      setShow(false);
      getExercises(user._id);
    }
  };

  console.log('_id del alert', id);

  return (
    <Modal className='modal-alert-delete' show={show}>
      <Modal.Header closeButton onClick={(e) => handleClose(e)}>
        <Modal.Title>
          {isDelete ? 'Eliminar' : 'Editar'} {title}
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
        {isDelete ? (
          <Button variant='primary' onClick={() => handleToDo(id)}>
            Eliminar
          </Button>
        ) : (
          <Link to='/coach/auth/exercise/editExercise'>Editar</Link>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AlertMessage;
