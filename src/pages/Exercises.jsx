import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getExercisesByCoach } from '../services/exercise/exercise.service';
import { getUser } from '../services/user/user.service';
import { use } from '../../../infit-backend/routes/exercise.routes';


const Exercises = () => {

  const [coach, setCoach] = useState({});
  const [exercises, setExercises] = useState([])

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
      setCoach(coach.coachID)
      getExercises(coach)
    } catch (error) {
      console.log(error);
    }
  };

  const getExercises = async (coachID) => {
    try {
      const exercisesCoach = await getExercisesByCoach(coachID);
      setExercises (exercisesCoach.map(item => item));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(  () => {
     getCoach(coachMock)
  }, [])

  useEffect(  () => {
    getExercises(coach.coachID)
  }, [coach])

  
  return (
    <section>
      <h1>Ejercicios disponibles</h1>
      <div className="exercise-list">
        {
          exercises.map((item, index) => <Exercises key={index} exercise={item} />)
        }
      </div>
    </section>
  )
}

export default Exercises
