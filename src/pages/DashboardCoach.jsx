import React, { useEffect, useState } from 'react';
import NextTraining from '../components/NextTraining.jsx';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getTrainings } from '../services/training/training.service';

const DashboardClient = (props) => {
  const { user } = WithAuth();
  const [coach, setCoach] = useState({});
  const [trainings, setTrainings] = useState([]);

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue)
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
    getCoach(user);
  }, [])



  console.log('this coach', coach)

  return (
    <>
      <h1>Hola {user.username}</h1>
      <h2>Este es tu próximo entrenamiento</h2>
      {
      // coach.trainings.map(training => 
      //   <NextTraining training={training}/>
      // )
      }
    </>
  );
};

export default DashboardClient;
