import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { createExercise } from '../services/exercise/exercise.service';
import { getTokenUser } from '../helpers/authHelpers';

function NewExercise() {
  const { user } = WithAuth();
  const [coach, setCoach] = useState(getTokenUser());
  const [exercise, setExercise] = useState({
    coachID: user._id,
    title: '',
    image: '',
    video: '',
    rest: {
      minute: 0,
      second: 0,
    },
  });
  const [rest, setRest] = useState({
    minute: 0,
    second: 0,
  });

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoach(coach);
  }, []);

  // el objetivo del programa será el objetivo escogido por el cliente


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

  const createNewExercise = () => {
    createExercise(exercise);
    setExercise({
      coachID: '',
      title: '',
      image: '',
      video: '',
      description: '',
      rest: {
        minute: 0,
        second: 0,
      },
    });
  };

  return (
    <div>
      <h1>Crea tu nuevo Ejercicio</h1>
      <form onSubmit={createNewExercise}>
        <label htmlFor='input-title'>Titulo</label>
        <input
          type='text'
          value={exercise.title}
          name='title'
          id='input-title'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='input-objective'>Description</label>
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

        <input type='submit' value='Nuevo Ejercicio!' />
      </form>
    </div>
  );
}

export default NewExercise;
