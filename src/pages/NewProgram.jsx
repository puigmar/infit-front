import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getClientsByCoach } from '../services/client/client.service';
import ClientPreview from '../components/client/ClientPreview.jsx';
import { v4 as uuidv4 } from 'uuid';
import { getTokenUser } from '../helpers/authHelpers';

function NewProgram() {
  const [coach, setCoach] = useState(getTokenUser());
  const [clients, setClients] = useState([]);

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
      setClients(clientsByCoach);
    } catch (error) {
      console.log(error);
    }
  };

  // SE LLAMA AL COACH Y CLIENT COMPONENTDIDMOUNT
  useEffect(() => {
    getCoach(coach);
  }, []);

  //SE LLAMA AL PROGRAMA BY THIS COACH & CLIENT
  useEffect(() => {
    coach.coachID && getClients(coach.coachID);
  }, [coach]);



  return (
    <div>
      <h1>Programa contratado</h1>
      <h3>Selecciona el cliente al que quieres agregar el programa</h3>
      {clients &&
        clients.map((client) => {
          return <ClientPreview key={uuidv4()} {...client} />;
        })}
    </div>
  );
}

export default NewProgram;
