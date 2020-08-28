import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { editExerciseByID } from '../../services/exercise/exercise.service';

const AlertMessageEdit = (props) => {
  const { title, show, setShow, reloadPage, _id} = props;

  const [exercise, setExercise] = useState({
    coachID: props.coachID,
    title: props.title,
    image: props.image,
    video: props.video,
    description: props.description,
    rest: {
      minute: props.rest.minute,
      second: props.rest.second,
    },
  });

  const [rest, setRest] = useState({
    minute: props.rest.minute,
    second: props.rest.second,
  });

  const handleClose = () => {
    setShow(false);
  };

  const handleEdit = () => {
    console.log('Este es el id del objeto a borrar', _id);
    // editar aqui los ejercicios
    editExerciseByID(_id, exercise)
    setShow(false);
    reloadPage();
    return;
  };
  console.log('Este es el id del objeto a borrar', _id);

  //EDITAR EL EJERCICIO
  //RECARGAR LA PAGINA



  const handleChangeValues = (event) => {
    event.preventDefault();
    const { name, value, id } = event.target;

    if (id.includes('rest')) {
      setRest({ ...rest, [name]: value });
      setExercise({ ...exercise, rest: { ...rest, [name]: value } });
      return;
    }

    setExercise({ ...exercise, [name]: value });
  };


  return (
    <Modal className='modal-alert-delete' show={show}>
      <Modal.Header closeButton onClick={(e) => handleClose(e)}>
        <Modal.Title>Editando {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <input
            type='text'
            value={exercise.title}
            name='title'
            id='input-title'
            onChange={(e) => handleChangeValues(e)}
          />

          <label htmlFor='input-objective'>Descripcion</label>
          <input
            type='text'
            name='description'
            value={exercise.description}
            id='input-objective'
            onChange={(e) => handleChangeValues(e)}
          />

          <label htmlFor='input-pictureProgram'>Image</label>
          <input
            type='file'
            name='image'
            value={exercise.picture}
            id='input-pictureProgram'
            onChange={(e) => handleChangeValues(e)}
          />

          <label htmlFor='input-videoProgram'>Video</label>
          <input
            type='file'
            name='video'
            value={exercise.picture}
            id='input-pictureProgram'
            onChange={(e) => handleChangeValues(e)}
          />

          <p>Rest</p>
          <label htmlFor='rest-minute'>Minutos</label>
          <input
            type='text'
            name='minute'
            value={exercise.rest.minute}
            id='rest-name'
            onChange={(e) => handleChangeValues(e)}
          />

          <label htmlFor='rest-second'>Segundos</label>
          <input
            type='text'
            name='second'
            value={exercise.rest.second}
            id='rest-duration'
            onChange={(e) => handleChangeValues(e)}
          />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => handleClose()}>
          Close
        </Button>
        <Button variant='primary' onClick={() => handleEdit()}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertMessageEdit;
