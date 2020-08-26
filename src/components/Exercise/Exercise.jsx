import React, {useState}  from 'react'

function Exercise(props) {
  const { title, description, image , rest, showText, showNumbers } = props;
  // const[exercise, setExercise] = useState(props.exercise)
  //const [showNumbers, setShowNumbers] = useState(false);
  // const [showText, setShowText] = useState(false);

  return (
  <div className="card-exercise">
    <div className="card-exercise_image">
      <img src={image} alt={title} />
    </div>
    <div className="card-exercise_content">
      {showNumbers && (
      <div className="card-exercise_numbers">
        <div className="card-exercise_series">{}</div>
        <div className="card-exercise_sets">{}</div>
      </div>
      )}
      <h3 className="card-exercise_title">{title}</h3>
      {showText && (
        <p className="card-exercise_description">{description}</p>
      )}
    </div>
  </div>
  )
}

export default Exercise;
