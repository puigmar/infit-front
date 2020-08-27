import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getProgramByUserId } from '../services/program/program.service';
import { getClientsByCoach } from '../services/client/client.service';

function NewProgram() {
  const { user } = WithAuth();
  const [coach, setCoach] = useState({})
  const [clients, setClients] = useState([])

  // //TODO DELETE MOCKS
  // const coachMock = {
  //   _id: '5f44e55a186acf0b52cad177',
  //   isCoach: true,
  //   username: '2',
  //   password: '$2b$10$LCbudLK5fTfJwzxQa15RLO7yTgYIEp3XLFt4LoBusB1THEI3D1D3a',
  //   created_at: { $date: '2020-08-25T10:18:02.308Z' },
  //   updated_at: { $date: '2020-08-25T10:18:02.308Z' },
  //   __v: 0,
  // };

  // const clientMock = {
  //   _id: '5f40dd2d3ab5a80681229be6',
  //   isCoach: false,
  //   username: '2',
  //   password: '$2b$10$LCbudLK5fTfJwzxQa15RLO7yTgYIEp3XLFt4LoBusB1THEI3D1D3a',
  //   created_at: { $date: '2020-08-25T10:18:02.308Z' },
  //   updated_at: { $date: '2020-08-25T10:18:02.308Z' },
  //   __v: 0,
  // };

  //LLAMAR AL COACH & CLIENT
  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getClients = async (coachID) => {
    try {
      const clientsByCoach = await getClientsByCoach(coachID);
      setClients('clients by coach',clientsByCoach);
    } catch (error) {
      console.log(error);
    }
  };

  // SE LLAMA AL COACH Y CLIENT COMPONENTDIDMOUNT
  useEffect(() => {
    console.log(user)
    getCoach(user);
  }, []);
  
  //SE LLAMA AL PROGRAMA BY THIS COACH & CLIENT
  useEffect(() => {
    getClients(coach.coachID);
    console.log('coach del program', coach)
    console.log('clientes de program', clients);
  }, [coach])


  return (
    <div>
      <h1>Programa contratado</h1>
      <h3>Selecciona el cliente al que quieres agregar el programa</h3>

    </div>
  );
}

export default NewProgram;
