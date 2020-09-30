import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getClientId, getUser } from '../services/user/user.service';
import { getExercisesByCoach } from '../services/exercise/exercise.service';
import SubHeader from '../components/SubHeader/SubHeader';
import { useHistory } from 'react-router-dom';
import ExerciseSidebar from '../components/ExerciseSideBar/ExerciseSidebar';
import { v4 as uuidv4 } from 'uuid';
import ExerciseProgram from '../components/exerciseProgram/ExerciseProgram';
import { createTraining } from '../services/training/training.service';
import { Button } from 'react-bootstrap';

function ProgramDetail() {
  const { provClient, user } = WithAuth();

  const [clientId, setClientId] = useState({});
  const [title, setTitle] = useState(provClient.wizard.objective);
  const [newTraining, setNewTraining] = useState([]); // array para rellenar con myExercises
  const [myExercises, setMyExercises] = useState([]);
  const [showTraining, setShowTraining] = useState([])
  const [date, setDate] = useState('');
  const [training, setTraining] = useState(false)

  let history = useHistory();

  // const handleUser = async (clientArg) => {
  //   try {
  //     const client = await getClientId(clientArg.userID);
  //     console.log('handleUser', client)
  //     setClientId(client);
  //     setTitle(client.wizard.objective);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getExercises = async (userID) => {
    try {
      const exercisesCoach = await getExercisesByCoach(userID);
      setMyExercises(exercisesCoach);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExercises(user._id);
    // handleUser(provClient);
  }, []);

  const handleShowTraining = (value) => {
    setNewTraining(value);
    setShowTraining(newTraining);
    console.log('He pasado por el padre!')
  }

  useEffect(() => {
    console.log('entrenamiento renderizado', newTraining)
    console.log('entrenamiento a mostrar', showTraining)
    setShowTraining(newTraining);
    console.log('Muestro los datos renderizados program detail')
  }, [newTraining])
  
  useEffect(() => {
    console.log('clg de showtrainig', showTraining)
  }, [showTraining])
  

  const handleOnClickSaveTraining = () => {
    createTraining({
      myExercises,
      coachID: user._id,
      clientID: provClient._id,
      date,
    });
  };

  return (
    <div>
      {provClient && <SubHeader title={title} history={history} />}
      <section className='exercises-list'>
        {showTraining.map((item) => (
          <ExerciseProgram
            key={uuidv4()}
            {...item}
            showNumbers={false}
            showText={true}
            newTraining={newTraining}
            setNewTraining={setNewTraining}
            setTraining={setTraining}
            handleShowTraining={handleShowTraining}
          />
        ))}
      </section>

      <ExerciseSidebar
        myExercises={myExercises}
        newTraining={newTraining}
        setNewTraining={setNewTraining}
      />

      <Button onClick={() => handleOnClickSaveTraining()}>
        Guardar Entrenamiento
      </Button>
    </div>
  );
}

export default ProgramDetail;
