import React, {useState}  from 'react'

function Exercise(props) {
  const[exercise, setExercise] = useState(props.exercise)
  const [showNumbers, setShowNumbers] = useState(false);
  const [showText, setShowText] = useState(false);

  return (
  <div className="card-exercise">
    <div className="card-exercise_image">
      <img src={exercise.image} alt={exercise.title} />
    </div>
    <div className="card-exercise_content">
      {props.showNumbers && (
      <div className="card-exercise_numbers">
        <div className="card-exercise_series">{}</div>
        <div className="card-exercise_sets">{}</div>
      </div>
      )}
      <h3 className="card-exercise_title">{exercise.title}</h3>
      {props.showText && (
        <p className="card-exercise_description">{exercise.description}</p>
      )}
    </div>
  </div>
  )
}

export default Exercise;
