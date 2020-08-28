import React from 'react'

function ExerciseSidebarBox(props) {
  return (
    <div id={props.exercise._id} className="exerciseBox" style={{backgroundImage: `url(${props.exercise.image})`}}>
      <h3>{props.exercise.title}</h3>
      <button className="exerciseBox_addButton" type="button" onClick={() => props.handleAddExercise(props.exercise._id)}></button>
    </div>
  )
}

export default ExerciseSidebarBox
