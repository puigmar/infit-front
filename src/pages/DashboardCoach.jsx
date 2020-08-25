import React from 'react';
import NextTraining from '../components/NextTraining.jsx';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getTraining } from '../services/training/training.service';

const DashboardClient = (props) => {
  const { user } = WithAuth();

  console.log('este es el usuario', user);
  const coach = async (user) => {
    try {
      const coach = await getUser(user);
      console.log(coach);
    } catch (error) {
      console.log(error);
    }
  };

  coach(user)
  // const trainings = getTraining( {...user})
  // console.log('entrenamientos del usuario', trainings)

  return (
    <>
      <h1>Hola {user.username}</h1>
      <h2>Este es tu próximo entrenamiento</h2>
      <NextTraining />
    </>
  );
};

export default DashboardClient;
