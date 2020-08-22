import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WithAuth from '../lib/AuthProvider';
import { Form, Carousel, Button } from 'react-bootstrap'

const Signup = () => {
  
  const totalSteps = 7;

  const { signup } = WithAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState(step)
  const [loginValidation, setLoginValidation] = useState(false);

  const [controls, setControls] = useState(false)
  const [touch, isTouch] = useState(false)
  const [interval, setInterval] = useState(null)

  const nextStep = () => {
    if(checkStep(step)) setStep(step+1)
  }

  const prevSep = () => {
    if(checkStep(step)) setStep(step-1)
  }

  const checkStep = (newStep) => {
    return (newStep >= totalSteps) ? false : true
  }

  useEffect(() => {
    setActiveIndex(step)
  }, [step])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Signup -> form submit', { username, password });
    signup({ username, password, isCoach: false });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nameConvesion = name.split('').map((letter,i) => (i===0) ? letter.toUpperCase() : letter).join('');
    eval('set'+nameConvesion)(value)
  };

  return (
    <div className="signup">

      <Carousel controls={controls} touch={touch} interval={interval} activeIndex={activeIndex}>
        <Carousel.Item>
          <h1>1. DATOS DE TU CUENTA</h1>

          <Form>
            <Form.Group controlId="username">
              <Form.Control type="text" name="username" onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control type="password" name="password" onChange={handleChange}/>
            </Form.Group>
          </Form>

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Button disabled={!loginValidation} variant="primary" size="lg" type="submit" onClick={() => nextStep()}>Continuar</Button>

      <p>Already have account?</p>
          <Link to={'/login'}> Login</Link>
    </div>
  );
};

export default Signup;
