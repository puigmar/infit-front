import React, { useState, useEffect, Fragment } from 'react';
import Exercise from '../components/Exercise/Exercise';
import { v4 as uuidv4 } from 'uuid';
import WithAuth from '../components/AuthProvider';

const Exercises = () => {
  const { user, getExercises } = WithAuth();
  const [myExercises, setMyExercises] = useState([]);
  const [changeExercises, setChangeExercises] = useState(false);
  //LLAMAR AL COACH & CLIENT

  const getMyExercises = async () => {
    try {
      const exercises = await getExercises(user._id);
      setMyExercises(exercises);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyExercises();
  }, []);


  return (
    <Fragment>
      <section>
        <h1>Ejercicios disponibles</h1>
        <div className='exercise-list'>
          {myExercises &&
            myExercises.map((item) => (
              <Exercise key={uuidv4()} {...item} getMyExercises={getMyExercises} />
            ))}
        </div>
        <div className='addExercise'></div>
      </section>
    </Fragment>
  );
};

export default Exercises;
