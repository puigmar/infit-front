import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import WithAuth from '../lib/AuthProvider';
import Carousel from 'react-bootstrap/Carousel'


const Signup = () => {
  const { signup } = WithAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [controls, setControls] = useState(false)

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

      <Carousel>
        <Carousel.Item>
          <h1>1. DATOS DE TU CUENTA</h1>
          <form onSubmit={handleFormSubmit}>
            <label>Username:</label>
            <input
              type='text'
              name='username'
              value={username}
              onChange={handleChange}
            />

            <label>Password:</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
            />

            <input type='submit' value='Signup' />
          </form>

          <p>Already have account?</p>
          <Link to={'/login'}> Login</Link>

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
    </div>
  );
};

export default Signup;
