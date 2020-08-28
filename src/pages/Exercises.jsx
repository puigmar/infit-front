import React, { useState, useEffect, Fragment } from 'react';
import WithAuth from '../components/AuthProvider';
import { getExercisesByCoach } from '../services/exercise/exercise.service';
import { getUser } from '../services/user/user.service';
import Exercise from '../components/Exercise/Exercise';

const Exercises = () => {
  const { user } = WithAuth();
  const [coach, setCoach] = useState({});
  const [exercises, setExercises] = useState([]);

  //LLAMAR AL COACH & CLIENT

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      console.log(coachValue);
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
      console.log(error);
    }
  };



  useEffect(() => {
    getCoach(user);
  }, []);

  useEffect(() => {
    getExercises(coach.coachID);
  }, [coach]);
  
  const reloadPage = () => {
    getExercises(coach.coachID);
  }

  return (
    <Fragment>
      <section>
        <h1>Ejercicios disponibles</h1>
        <div className='exercise-list'>
          {exercises.map((item, index) => (
            <Exercise
              key={index}
              {...item}
              showNumbers={false}
              showText={true}
              reloadPage={reloadPage}
            />
          ))}
        </div>
        <div className='addExercise' ></div>
      </section>
    </Fragment>
  );
};

export default Exercises;
