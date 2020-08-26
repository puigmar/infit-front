import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getExercisesByCoach } from '../services/exercise/exercise.service';
import { getUser } from '../services/user/user.service';


function Exercises() {
  const { user } = WithAuth();
  const [coach, setCoach] = useState({});
  const [exercises, setExercises] = useState([{}])

  const coachMock = {
    _id: '5f44e55a186acf0b52cad177',
    isCoach: true,
    username: '2',
    password: '$2b$10$LCbudLK5fTfJwzxQa15RLO7yTgYIEp3XLFt4LoBusB1THEI3D1D3a',
    created_at: { $date: '2020-08-25T10:18:02.308Z' },
    updated_at: { $date: '2020-08-25T10:18:02.308Z' },
    __v: 0,
  };

  //LLAMAR AL COACH & CLIENT
  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      console.log(coachValue)
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getExercises = async (coachID) => {
    try {
      const exercisesCoach = await getExercisesByCoach(coachID);
      setExercises([exercisesCoach]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log('usuario de useEffect', user)
    getCoach(user)
    console.log('he encontrado el coach?', coach)
  }, [])

  useEffect(() => {
    console.log('coachID', coach.coachID);
    getExercises(coach.coachID)
  }, [coach])

console.log('este es el coach', coach);
console.log('este es el entrenamiento', exercises);

  return (
    <div>
      <h1>Ejercicios con cojones</h1>
    </div>
  )
}

export default Exercises
