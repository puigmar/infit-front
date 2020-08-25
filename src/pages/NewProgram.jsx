import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getProgramByUserId } from '../services/program/program.service';

function NewProgram() {
  const { user } = WithAuth();
  const [program, setProgram] = useState({});
  const [coach, setCoach] = useState({})
  const [client, setClient] = useState({})

  //TODO DELETE MOCKS
  const coachMock = {
    _id: '5f44e55a186acf0b52cad177',
    isCoach: true,
    username: '2',
    password: '$2b$10$LCbudLK5fTfJwzxQa15RLO7yTgYIEp3XLFt4LoBusB1THEI3D1D3a',
    created_at: { $date: '2020-08-25T10:18:02.308Z' },
    updated_at: { $date: '2020-08-25T10:18:02.308Z' },
    __v: 0,
  };

  const clientMock = {
    _id: '5f40dd2d3ab5a80681229be6',
    isCoach: false,
    username: '2',
    password: '$2b$10$LCbudLK5fTfJwzxQa15RLO7yTgYIEp3XLFt4LoBusB1THEI3D1D3a',
    created_at: { $date: '2020-08-25T10:18:02.308Z' },
    updated_at: { $date: '2020-08-25T10:18:02.308Z' },
    __v: 0,
  };

  //LLAMAR AL COACH & CLIENT
  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getClient = async (user) => {
    try {
      const clientValue = await getUser(user);
      console.log('clientValue', clientValue)
      setClient(clientValue);
    } catch (error) {
      console.log(error);
    }
  };


  //LLAMAR AL PROGRAMA BY THIS COACH & CLIENT
  const programById = async (client, coach) => {
    try {
      const programUser = await getProgramByUserId(client, coach);
      console.log('programUser',programUser)
      setProgram(programUser)
    } catch (error) {}
  };

  // SE LLAMA AL COACH Y CLIENT COMPONENTDIDMOUNT
  useEffect(() => {
    getCoach(coachMock);
    getClient(clientMock);
  }, []);

  //SE LLAMA AL PROGRAMA BY THIS COACH & CLIENT
  useEffect(() => {
    programById(client.clientID, coach.coachID);
  },  [coach, client])
  
  //PINTAR SUS ATRIBUTOS
  console.log('coach', coach);
  console.log('client', client);
  console.log('program', program);


  return (
    <div>
      <h1>Programa contratado</h1>

      <h2>Duracion</h2>
      <p></p>
      <h2>Objetivo</h2>
      <p>{program && program.objective}</p>
    </div>
  );
}

export default NewProgram;
