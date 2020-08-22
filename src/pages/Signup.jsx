import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WithAuth from '../services/AuthProvider';

const Signup = () => {
  const { signupUser } = WithAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('SignupUser -> form submit', { username, password });
    signupUser({ username, password, isCoach: false });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    const nameConvesion = name.split('').map((letter,i) => (i===0) ? letter.toUpperCase() : letter).join('');
    eval('set'+nameConvesion)(value)
  };

  return (
    <div>
      <h1>Sign Up</h1>

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
    </div>
  );
};

export default Signup;
