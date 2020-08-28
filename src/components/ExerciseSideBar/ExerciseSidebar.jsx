import React, { useState, useEffect } from 'react';
import {
  getExercises,
  getExercisesByCoach,
} from '../../services/exercise/exercise.service';
import ExerciseSidebarBox from '../ExerciseSidebarBox/ExerciseSidebarBox.jsx';
import './ExerciseSisebar.css';

function ExerciseSidebar(props) {

  const { myExercises, newTraining, setNewTraining } = props;
  const [showSidebar, setShowSidebar] = useState(true);


  console.log('estos son los ejercicios del Sidebar', myExercises)

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };



  return (
    <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
      <button type='button' onClick={() => handleSidebar()}>
        <span className='backLink icon-backLinksvg'></span>
      </button>
      <div className='sidbar_exerciseList'>
        {myExercises &&
          myExercises.map((exercise, index) => (
            <ExerciseSidebarBox
              key={index}
              exercise={exercise}
              newTraining={newTraining}
              setNewTraining={setNewTraining}
            />
          ))}
      </div>
    </div>
  );
}

export default ExerciseSidebar;
