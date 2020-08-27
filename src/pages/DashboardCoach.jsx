import React, { useEffect, useState } from 'react';
import NextTraining from '../components/NextTraining.jsx';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getTrainings } from '../services/training/training.service';
import { Link } from 'react-router-dom';

const DashboardClient = (props) => {
  const { user } = WithAuth();
  const [coach, setCoach] = useState({});

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoach(user);
  }, []);

  return (
    <>
      <h1>Hola {coach && coach.username}</h1>
      <h2>Este es tu próximo entrenamiento</h2>
      <Link to={'/coach/auth/program'} >Crea un nuevo programa de Programa</Link>
      <br/>
      <Link to={'/coach/auth/exercises'} >Estos son tus ejercicios</Link>
      <br/>
      <Link to={'/coach/auth/newExercises'} >Crea ejercicios</Link>
    </>
  );
};

export default DashboardClient;