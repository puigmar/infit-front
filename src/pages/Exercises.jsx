import React, { useState, useEffect, Fragment } from 'react';
import WithAuth from '../components/AuthProvider';
import { getExercisesByCoach } from '../services/exercise/exercise.service';
import { getUser } from '../services/user/user.service';
import Exercise from '../components/Exercise/Exercise';
import AlertMessage from '../components/AlertMessage/AlertMessage'
import ExerciseDetail from '../components/ExerciseDetail/ExerciseDetail'

const Exercises = () => {

function Exercises() {
  const { user } = WithAuth();
  const [coach, setCoach] = useState({});
  const [exercises, setExercises] = useState([]);

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
      setExercises(exercisesCoach);
    } catch (error) {
      console.log(error)
    }

  };

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
    <Fragment>
      <section>
        <h1>Ejercicios disponibles</h1>
        <div className='exercise-list'>
          {
          exercises.map((item, index) => (
            <Exercise key={index} {...item} handleAlertDeleteExercice={handleAlertDeleteExercice} handleModalEdition={handleModalEdition} showNumbers={false} showText= {true} />
          ))}
        </div>
        <div className="addExercise" onClick={() => createNewExercice()}></div>
      </section>
      
      {/*Modals*/}
      <AlertMessage modalContent={modalContent} handleDelete={handleDelete} handleClose={handleClose} show={show}/>
      <ExerciseDetail exerciseInfo={exerciseInfo}  handleClose={handleClose} showEdition={showEdition}/>
    </Fragment>

  );
};

export default Exercises;
