import React, { useState, useEffect } from 'react'
import WithAut from '../components/AuthProvider'
import WithAuth from '../components/AuthProvider'
import { getUser } from '../services/user/user.service';
import { getTokenUser } from '../helpers/authHelpers';
import { getExercisesByCoach } from '../services/exercise/exercise.service';


function ProgramDetail() {
  // get trainings this coach
  // llamar al coach
  const [coach, setCoach] = useState(getTokenUser());
  const [newTraining, setNewTraining] = useState([]); // array para rellenar con myExercises
  let myExercises = []; // todos los ejercicios del Coach
  
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
      console.log('exercises coach getExercises', exercisesCoach)
      return exercisesCoach;
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getCoach(coach);
  }, []);

  useEffect(() => {
    getExercises(coach.coachID);
  }, [coach]);

  console.log('Estos son mis ejercicios', myExercises)
  
  return (
    <div>

    </div>
  )
}

export default ProgramDetail;
