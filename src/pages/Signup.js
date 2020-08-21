import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import WithAuth from '../lib/AuthProvider';

const Signup = () => {
  const { signup } = WithAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Signup -> form submit', { username, password });
    signup({ username, password });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsername(name);
    setPassword(value);
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
