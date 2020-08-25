import React, { useEffect, useState } from 'react';
import NextTraining from '../components/NextTraining.jsx';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getTrainings } from '../services/training/training.service';
import { Link } from 'react-router-dom';

const DashboardClient = (props) => {
  const { user } = WithAuth();
  const [coach, setCoach] = useState({});
  const [trainings, setTrainings] = useState([]);

  //TODO DELETE MOCK
  const userMock = {
    _id: '5f44e55a186acf0b52cad177',
    isCoach: true,
    username: '2',
    password: '$2b$10$LCbudLK5fTfJwzxQa15RLO7yTgYIEp3XLFt4LoBusB1THEI3D1D3a',
    created_at: { $date: '2020-08-25T10:18:02.308Z' },
    updated_at: { $date: '2020-08-25T10:18:02.308Z' },
    __v: 0,
  };

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  // const getTrainings = async ({userID, isCoach}) => {
  //   try {
  //     const trainingsValues = await getTrainings({userID, isCoach});
  //     console.log(trainingsValues);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // getTrainings({ userID: user._id, isCoach: true});

  useEffect(() => {
    getCoach(userMock);
  }, []);

  return (
    <>
      <h1>Hola {userMock && userMock.username}</h1>
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
