import React, { useState } from 'react';
import WithAuth from '../components/AuthProvider';

const LoginClient = () => {
  const { loginUser } = WithAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log('LoginUser -> form submit', { username, password });
      await loginUser({username, password, isCoach: false});
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nameConversion = name
      .split('')
      .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
      .join('');
    // eval('set' + nameConversion)(value);
    if(('set' + nameConversion) === 'setUsername'){
      setUsername(value);
    } else {
      setPassword(value);
    };
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

export default LoginClient;
