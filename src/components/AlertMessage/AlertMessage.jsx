import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap';

const AlertMessage = ({modalContent, show, handleClose, handleDelete }) => {

  const {title, url, _id} = modalContent;
  
  return (
    <Modal className="modal-alert-delete" show={show}>
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
        <Button variant="primary" onClick={() => handleDelete(_id)}>Borrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AlertMessage
