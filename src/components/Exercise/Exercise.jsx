import React, { useState } from 'react';
import { Button, Card, ListGroupItem, ListGroup } from 'react-bootstrap';

function Exercise(props) {
  const { title, description, image, rest, showText, showNumbers } = props;

  return (
    <Card>
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>

        <Button variant='primary'>Editar</Button>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        <ListGroupItem>{rest && rest.minutes}</ListGroupItem>
        <ListGroupItem>{rest && rest.seconds}</ListGroupItem>
      </ListGroup>
    </Card>
  );
}

// const[exercise, setExercise] = useState(props.exercise)
//const [showNumbers, setShowNumbers] = useState(false);
// const [showText, setShowText] = useState(false);
// <div className="card-exercise">
//   <div className="card-exercise_image">
//     <img src={image} alt={title} />
//   </div>
//   <div className="card-exercise_content">
//     {showNumbers && (
//     <div className="card-exercise_numbers">
//       <div className="card-exercise_series">{}</div>
//       <div className="card-exercise_sets">{}</div>
//     </div>
//     )}
//     <h3 className="card-exercise_title">{title}</h3>
//     {showText && (
//       <p className="card-exercise_description">{description}</p>
//     )}
//   </div>
// </div>

export default Exercise;
