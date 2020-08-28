import React, { useState, useEffect } from 'react'
import WithAuth from '../components/AuthProvider'
import { getClientId, getUser } from '../services/user/user.service';
import { getTokenUser } from '../helpers/authHelpers';
import { getExercisesByCoach } from '../services/exercise/exercise.service';
import SubHeader from '../components/SubHeader/SubHeader';
import { useHistory } from "react-router-dom";



function ProgramDetail(props) {
  // get trainings this coach
  // llamar al coach

  const { provClientId } = WithAuth();

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

  const handleUSer = async (id) => {
    try{
      console.log('id del cliente: ---->', id)
      const client = await getClientId(id)
      console.log('Client: --->:', client)
    }
    catch(err){
      console.log(err)
    }
  }
  
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
    coach && getCoach(coach);
    handleUSer(provClientId)
  }, []);

  useEffect(() => {
    coach && getExercises(coach.coachID);
  }, [coach]);

  console.log('Estos son mis ejercicios', myExercises)
  console.log('provClientID: ---->', provClientId)
  return (
    <div>
      {/* <SubHeader title={} /> */}
    </div>
  )
}

export default ProgramDetail;
