import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getExercisesByCoach } from '../services/exercise/exercise.service';
import { getUser } from '../services/user/user.service';
// import ExerciseDetail from '../components/Exercise/ExerciseDetail.jsx';
import Exercise from '../components/Exercise/Exercise';

const Exercises = () => {
  const { user } = WithAuth()
  const [coach, setCoach] = useState({});
  const [exercises, setExercises] = useState([]);

  //LLAMAR AL COACH & CLIENT

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getExercises = async (coachID) => {
    try {
      const exercisesCoach = await getExercisesByCoach(coachID);
      setExercises(exercisesCoach);
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    getCoach(user);
  }, []);

  useEffect(() => {
    console.log('este es el coachID', coach.coachID)
    getExercises(coach.coachID);
  }, [coach]);

  return (
    <section>
      <h1>Ejercicios disponibles</h1>
      <div className='exercise-list'>
        {
        exercises.map((item, index) => (
          // console.log('item', item)
          <Exercise key={index} {...item} showNumbers={false} showText= {true} />
        ))}
      </div>
    </section>
  );
};

export default Exercises;
