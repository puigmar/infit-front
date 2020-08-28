import React, { useEffect, useState } from 'react';
import { getUser } from '../services/user/user.service';
import { getTrainings } from '../services/training/training.service';
import NextTraining from '../components/NextTraining.jsx';
import { Link } from 'react-router-dom';
import { getTokenUser } from '../helpers/authHelpers.js';

const DashboardClient = (props) => {
  const [coach, setCoach] = useState(getTokenUser());

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoach(coach);
  }, []);

  console.log(coach)

  return (
    <section>
      <h1>Hola {coach && coach.name}</h1>
      <h2>Este es tu próximo entrenamiento</h2>
      <Link to={'/coach/auth/program'} >Crea un nuevo programa de Programa</Link>
      <br/>
      <Link to={'/coach/auth/exercises'} >Estos son tus ejercicios</Link>
      <br/>
      <Link to={'/coach/auth/newExercises'} >Crea ejercicios</Link>
    </section>
  );
};

export default DashboardClient;