import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getClientsByCoach } from '../services/client/client.service';
import ClientPreview from '../components/client/ClientPreview.jsx';
import { v4 as uuidv4 } from 'uuid';

function NewProgram() {
  const { user } = WithAuth();
  const [clients, setClients] = useState([]);


  const getClients = async (userID) => {
    try {
      const clientsByCoach = await getClientsByCoach(userID);
      setClients(clientsByCoach);
    } catch (error) {
      console.log(error);
    }
  };

  //SE LLAMA AL PROGRAMA BY THIS COACH & CLIENT
  useEffect(() => {
    getClients(user._id);
  }, []);

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
