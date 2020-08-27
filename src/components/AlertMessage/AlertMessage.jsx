import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { deleteExerciseByID } from '../../services/exercise/exercise.service';

const AlertMessage = (props) => {

  const {title, url, _id, isDelete, show, setShow } = props;
  
  const handleClose = () => {
    setShow(false);
  }
  
  const deleteExercises = async (exerciseID) => {
    try {
      await deleteExerciseByID(exerciseID);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToDo = (id) => {
    if(isDelete){
      deleteExercises(id);
      return;
    }
  }

  
  return (
    <Modal className="modal-alert-delete" show={show}>
      <Modal.Header closeButton onClick={(e) => handleClose(e)}>
  <Modal.Title>{isDelete ? 'Eliminar' : 'Editar'} {title}</Modal.Title>
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
        <Button variant="primary" onClick={() => handleToDo(_id)}>{isDelete ? 'Eliminar' : 'Editar'}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AlertMessage
