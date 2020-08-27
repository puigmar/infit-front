import React from 'react';
import EditableField from '../EditableField/EditableField';
import { Button, Modal } from 'react-bootstrap';


function ExerciseDetail(exerciseInfo, showEdition, handleClose, handleDelete) {
  const keys = Object.keys(exerciseInfo);
  const { _id, title, description, url } = exerciseInfo;
  return (
    <Modal className="modal-exercise-detail" showEdition={showEdition}>
      <Modal.Header closeButton onClick={(e) => handleClose(e)}>
        <Modal.Title><EditableField key={keys['title']} value={title} /></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-exercise_img">
          <img src={url} alt={title} />
        </div>
        <h3>{title}</h3>
        <p><EditableField id={_id} key={keys['description']} value={description} /></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
        <Button variant="secondary" onClick={() => handleDelete(_id)}>Borrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExerciseDetail;
