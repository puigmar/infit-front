import React, { useState, useEffect, Fragment } from 'react';
import WithAuth from '../components/AuthProvider';
import { getExercisesByCoach } from '../services/exercise/exercise.service';
import { getUser } from '../services/user/user.service';
import Exercise from '../components/Exercise/Exercise';
import AlertMessage from '../components/AlertMessage/AlertMessage'
import ExerciseDetail from '../components/ExerciseDetail/ExerciseDetail'

const Exercises = () => {

  const [show, setShow] = useState(false); // -> show Modal Alert
  const [showEdition, setShowEdition] = useState(false) // -> show Modal Edition

  const [mdShow, setMdShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [modalContent, setModalContent] = useState({}) // --> Info modal alert
  const [modalEditionContent, setModalEditionContent] = useState({}) // --> Info modal Edición

  const [exerciseInfo, setExerciseInfo] = useState({})
  const [handleDelete, setHandleDelete] = useState(false)

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  const handleShowEditon = () => setShowEdition(true);

  const { user } = WithAuth()
  const [coach, setCoach] = useState({});
  const [exercises, setExercises] = useState([]);

  //LLAMAR AL COACH & CLIENT

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getExercises = async (coachID) => {
    try {
      const exercisesCoach = await getExercisesByCoach(coachID);
      setExercises(exercisesCoach);
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    setShow(false)
    getCoach(user);
  }, []);

  useEffect(() => {
    console.log('este es el coachID', coach.coachID)
    getExercises(coach.coachID);
    console.log(exercises)
  }, [coach]);

  const handleAlertDeleteExercice = async (e) => {
    const excerciseId = e.currentTarget.getAttribute('data-id');
    const targetModal = await exercises.find( exercise => exercise._id === excerciseId)
    setModalContent(targetModal)
    handleShow()
  }

  const createNewExercice = () => {
  }

  const handleModalEdition = async (e) => {
    const excerciseId = e.currentTarget.getAttribute('data-id');
    const exerciseTarget = await exercises.find( exercise => exercise._id === excerciseId)
    setModalEditionContent(exerciseTarget)
    handleShowEditon()
  }

  return (
    <Fragment>
      <section>
        <h1>Ejercicios disponibles</h1>
        <div className='exercise-list'>
          {
          exercises.map((item, index) => (
            <Exercise key={index} {...item} handleAlertDeleteExercice={handleAlertDeleteExercice} handleModalEdition={handleModalEdition} showNumbers={false} showText= {true} />
          ))}
        </div>
        <div className="addExercise" onClick={() => createNewExercice()}></div>
      </section>
      
      {/*Modals*/}
      <AlertMessage modalContent={modalContent} handleDelete={handleDelete} handleClose={handleClose} show={show}/>
      <ExerciseDetail exerciseInfo={exerciseInfo}  handleClose={handleClose} showEdition={showEdition}/>
    </Fragment>

  );
};

export default Exercises;
