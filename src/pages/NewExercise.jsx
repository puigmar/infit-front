import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { createExercise } from '../services/exercise/exercise.service';

function NewExercise() {
  const { user } = WithAuth();
  const [coach, setCoach] = useState({});
  const [exercise, setExercise] = useState({
    coachID: '',
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
    getCoach(user);
  }, []);

  // el objetivo del programa será el objetivo escogido por el cliente
  useEffect(() => {
    setExercise({ ...exercise, coachID: coach.coachID });
  }, [coach]);

  const handleChangeValues = (event) => {
    const { name, value, id } = event.target;

    if (id.includes('rest')) {
      setRest({ ...rest, [name]: value });
      setExercise({ ...exercise, rest: { ...rest, [name]: value } });
      return;
    }

    setExercise({ ...exercise, [name]: value });
  };

  const createNewExercise = async () => {
    try {
      await createExercise(exercise);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Crea tu nuevo programa</h1>
      <form action='post' onSubmit={() => createNewExercise()}>
        <label htmlFor='input-title'>Titulo</label>
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
          value={exercise.objective}
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

        <p>Pack</p>
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

        <input type='submit' value='Nuevo programa!' />
      </form>
    </div>
  );
}

export default NewExercise;
