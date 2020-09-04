import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getClientId, getUser } from '../services/user/user.service';
import { getExercisesByCoach } from '../services/exercise/exercise.service';
import SubHeader from '../components/SubHeader/SubHeader';
import { useHistory } from 'react-router-dom';
import ExerciseSidebar from '../components/ExerciseSideBar/ExerciseSidebar';
import { v4 as uuidv4 } from 'uuid';
import Exercise from '../components/Exercise/Exercise';
import { createTraining } from '../services/training/training.service'
import { Button } from 'react-bootstrap';

function ProgramDetail(props) {
  const { provClient, user } = WithAuth();

  const [clientId, setClientId] = useState({});
  const [title, setTitle] = useState('');
  const [newTraining, setNewTraining] = useState([]); // array para rellenar con myExercises
  const [myExercises, setMyExercises] = useState([]);
  const [trainingModel, setTrainingModel] = useState({})
  // todos los ejercicios del Coach

  let history = useHistory();

  // const getCoach = async (user) => {
  //   try {
  //     const coachValue = await getUser(user);
  //     setCoach(coachValue);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUSer = async (id) => {
    try {
      const client = await getClientId(id);
      setClientId(client);
      setTitle(client.wizard.objective);
    } catch (err) {
      console.log(err);
    }
  };

  const getExercises = async (userID) => {
    try {
      const exercisesCoach = await getExercisesByCoach(userID);
      setMyExercises(exercisesCoach);
      return exercisesCoach;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExercises(user._id);
    handleUSer(provClient);
  }, []);


  const handleOnClickSaveTraining = () => {
    console.log('myExercises from program detail', myExercises)
    createTraining({myExercises, coachID: user._id, clientID: provClient});
  }
  return (
    <div>
      {clientId && <SubHeader title={title} history={history} />}
      <section className='exercises-list'>
        {
          newTraining.map((item) => (
            <Exercise
              key={uuidv4()}
              {...item}
              showNumbers={false}
              showText={true}
            />
          ))
        }
      </section>

      <ExerciseSidebar
        myExercises={myExercises}
        newTraining={newTraining}
        setNewTraining={setNewTraining}
      />
    <Button onClick={() => handleOnClickSaveTraining()}>Guardar Entrenamiento</Button>
    </div>
  );
}

export default ProgramDetail;
