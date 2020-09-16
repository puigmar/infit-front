import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const AlertEditExercise = (props) => {
  const {
    title,
    _id,
    show,
    setShow,
    newTraining,
    setNewTraining,
    handleShowTraining
  } = props;

  const [training, setTraining] = useState(newTraining)

  const [exercise, setExercise] = useState({
    _id,
    coachID: props.coachID,
    title: props.title,
    image: props.image,
    video: props.video,
    description: props.description,
    rest: {
      minute: props.rest.minute,
      second: props.rest.second,
    },
    
    series: props.series,
    repetition: props.repetition,
  });

  const [rest, setRest] = useState({
    minute: props.rest.minute,
    second: props.rest.second,
  });

  const handleClose = () => {
    setShow(false);
  };

  const editNewTraining = () => {
    // para editarlo
    // 1. Encontrar la posición de este entrenamiento
    let indexEdited = training.findIndex( training => training._id === _id);
    console.log('index', indexEdited)
    console.log('Exercise', exercise)

    console.log('copyTraining NO spliced', training)
    setTraining(training.splice(indexEdited, 1, exercise))
    console.log('copyTraining YES spliced', training)
    setNewTraining([...training])
    setShow(false);
    console.log('nuevo entrenamiento editado', newTraining)
    console.log('te he renderizado');
  }
  
  const handleEdit = () => {
    console.log('Este es el id del objeto a editar', _id);
    editNewTraining()
  };

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

        <label htmlFor='input-set'>Series</label>
        <input
          type='number'
          name='series'
          value={exercise.series}
          id='input-set'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='input-repetition'>Repeticiones</label>
        <input
          type='number'
          name='repetition'
          value={exercise.repetition}
          id='input-repetition'
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

export default AlertEditExercise;
