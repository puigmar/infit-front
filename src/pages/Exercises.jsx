import React, { useState, useEffect, Fragment } from 'react';
import { getExercisesByCoach } from '../services/exercise/exercise.service';
import { getUser } from '../services/user/user.service';
import Exercise from '../components/Exercise/Exercise';
import { getTokenUser } from '../helpers/authHelpers';
import { v4 as uuidv4 } from 'uuid';

const Exercises = () => {
  const [coach, setCoach] = useState(getTokenUser());
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

  const getExercises = async (userID) => {
    try {
      const exercisesCoach = await getExercisesByCoach(userID);
      console.log('exercises coach getExercises', exercisesCoach)
      setExercises(exercisesCoach);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoach(coach);
  }, []);

  useEffect(() => {
    getExercises(coach.userID);
    return () => {
      getExercises(coach.userID);
    }
  }, [coach]);

  console.log('Estos son tus ejercicios', exercises)

  return (
    <Fragment>
      <section>
        <h1>Ejercicios disponibles</h1>
        <div className='exercise-list'>
          {exercises.map(item => 
            <Exercise
              key={uuidv4()}
              {...item}
              showNumbers={false}
              showText={true}
              getExercises={getExercises}
            />
          )}
        </div>
        <div className='addExercise' ></div>
      </section>
    </Fragment>
  );
};

export default Exercises;
