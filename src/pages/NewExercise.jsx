import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getProgramByUserId } from '../services/program/program.service';

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

  //TODO DELETE MOCK
  const userMock = {
    _id: '5f44e55a186acf0b52cad177',
    isCoach: true,
    username: '2',
    password: '$2b$10$LCbudLK5fTfJwzxQa15RLO7yTgYIEp3XLFt4LoBusB1THEI3D1D3a',
    created_at: { $date: '2020-08-25T10:18:02.308Z' },
    updated_at: { $date: '2020-08-25T10:18:02.308Z' },
    __v: 0,
  };

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoach(userMock);
  }, []);

  // el objetivo del programa será el objetivo escogido por el cliente
  useEffect(() => {
    setExercise({ ...exercise, coachID: userMock._id });
  }, [coach]);

  const handleChangeValues = (event) => {
    const { name, value, id } = event.target;

    if (id.includes('rest')) {
      setRest({ ...rest, [name]: value });
      setExercise({ ...exercise, rest: { ...rest, [name]: value } });
      console.log('Exercise if', exercise);
      return;
    }

    console.log('name', name)
    console.log('value', value)

    setExercise({ ...exercise, [name]: value });
    console.log('Exercise no if', exercise);
  };

  return (
    <div>
      <h1>Crea tu nuevo programa</h1>
      <form action='post'>
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
          id='pack-name'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='pack-second'>Segundos</label>
        <input
          type='text'
          name='second'
          value={exercise.rest.second}
          id='pack-duration'
          onChange={(e) => handleChangeValues(e)}
        />

        <input type='submit' value='Nuevo programa!' />
      </form>
    </div>
  );
}

export default NewExercise;
