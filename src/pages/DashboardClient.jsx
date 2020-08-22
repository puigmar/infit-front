import React from 'react';
import NextTraining from '../components/NextTraining.jsx'
import WithAuth from '../services/AuthProvider';


const DashboardClient = () => {
  const { user } = WithAuth();
  


  return (
    <>
      <h1>Hola campeón</h1>
      <h2>Este es tu próximo entrenamiento</h2>
      <NextTraining />      
    </>
  );
};

export default DashboardClient;
