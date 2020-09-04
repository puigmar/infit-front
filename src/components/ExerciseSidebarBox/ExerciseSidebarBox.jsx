import React, { Fragment } from 'react';

function ExerciseSidebarBox(props) {
  const { newTraining, setNewTraining, exercise } = props;

  const handleAddExercise = () => setNewTraining([...newTraining, exercise]);
  return (
    <Fragment>
      <div
        className='exerciseBox'
        style={{ backgroundImage: `url(${exercise.image})` }}
      >
        <h3>{exercise.title}</h3>
        <button
          className='exerciseBox_addButton'
          type='button'
          onClick={() => handleAddExercise()}
        >
          Agregar ejercicio
        </button>
      </div>
    </Fragment>
  );
}

export default ExerciseSidebarBox;
