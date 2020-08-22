import React, { useState } from 'react';
import WithAuth from '../lib/AuthProvider';

const Login = () => {
  const { login } = WithAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log('Login -> form submit', { username, password });
      const isUser = await login(username, password);
      if(isUser){
        
      }
    } catch (error) {}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nameConversion = name
      .split('')
      .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
      .join('');
    eval('set' + nameConversion)(value);
  };

  return (
    <div>
      <h1>Login</h1>

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

        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default Login;
