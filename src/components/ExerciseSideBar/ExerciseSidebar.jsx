import React, {useState, useEffect} from 'react'
import { getExercises, getExercisesByCoach } from '../../services/exercise/exercise.service';
import ExerciseSidebarBox from '../ExerciseSidebarBox/ExerciseSidebarBox.jsx';
function ExerciseSidebar(props) {

  const [exercises, setExercises] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true)

  const getExercises = async (coachID) => {
    try {
      const exercisesCoach = await getExercisesByCoach(coachID);
      setExercises(exercisesCoach);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExercises(props.coach);
  }, []);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const handleAddExercise = () => {}


  return (
    <div className={`sidebar ${showSidebar ? "show" : ''}`}>
      <button type="button" onClick={() => handleSidebar()}><span className="backLink icon-backLinksvg"></span></button>
      <div class="sidbar_exerciseList">
        { exercises.map( (exercise, index) => <ExerciseSidebarBox key={index} handleAddExercise={handleAddExercise} exercise={exercise}  />)}
      </div>
    </div>
  )
}

export default ExerciseSidebar
