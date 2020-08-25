import React from 'react';
import NextTraining from '../components/NextTraining.jsx';
import WithAuth from '../components/AuthProvider';
import { getTraining } from '../services/training/training.service';

const DashboardClient = () => {
  const { user, isLoggedin, isLogout } = WithAuth();

  console.log('este es el usuario', user)
  const trainings = getTraining( {...user})
  console.log('entrenamientos del usuario', trainings)

  return (
    <>
      <h1>Hola campeón</h1>
      <h2>Este es tu próximo entrenamiento</h2>
      <NextTraining />
    </>
  );
};

export default DashboardClient;
