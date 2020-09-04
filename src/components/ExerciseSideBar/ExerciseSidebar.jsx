import React, { useState } from 'react';
import ExerciseSidebarBox from '../ExerciseSidebarBox/ExerciseSidebarBox.jsx';
import './ExerciseSisebar.css';
import { v4 as uuidv4 } from 'uuid';

function ExerciseSidebar(props) {

  const { myExercises, newTraining, setNewTraining } = props;
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
      <button type='button' onClick={() => handleSidebar()}>
        <span className='backLink icon-backLinksvg'/>
      </button>
      <div className='sidbar_exerciseList'>
        {myExercises &&
          myExercises.map((exercise, index) => (
            <ExerciseSidebarBox
              key={uuidv4()}
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
