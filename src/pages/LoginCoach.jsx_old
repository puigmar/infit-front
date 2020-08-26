import React, { useState } from 'react';
import WithAuth from '../components/AuthProvider';

const LoginCoach = () => {
  const { loginUser } = WithAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    loginUser({ username, password, isCoach:true });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nameConversion = name
      .split('')
      .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
      .join('');
    if ('set' + nameConversion === 'setUsername') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div>
      <h1>Login coach</h1>

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

export default LoginCoach;
