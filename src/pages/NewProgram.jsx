import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getClientsByCoach } from '../services/client/client.service';
import ClientPreview from '../components/client/ClientPreview.jsx';

function NewProgram() {
  const { user } = WithAuth();
  const [coach, setCoach] = useState({});
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
    console.log(user);
    getCoach(user);
  }, []);

  //SE LLAMA AL PROGRAMA BY THIS COACH & CLIENT
  useEffect(() => {
    getClients(coach.coachID);
    console.log('coach del program', coach);
    console.log('clientes de program', clients);
  }, [coach]);

  // let example = {
  //   adress: '',
  //   avatarUrl:
  //     'https://res.cloudinary.com/dtg4wdrbg/image/upload/v1598546335/inFit-gallery/people-2604149_1920.jpg',
  //   biometrics: { weight: Array(1), age: 40, height: 167, sex: 'male' },
  //   clientID: '5f47e1cab960183545545f41',
  //   coachID: '5f47e50533502d322b081a36',
  //   created_at: '2020-08-27T16:39:38.341Z',
  //   name: 'Ferran',
  //   photos: [],
  //   savePhoto: false,
  //   surname: 'Puig',
  //   telephone: 453454353,
  //   updated_at: '2020-08-27T16:39:38.341Z',
  //   wizard: {
  //     availability: {
  //       max: 20,
  //       min: 14,
  //     },
  //     objective: 'Ganar Músculo',
  //     pack: { name: 'Pack 2', duration: 36, price: 180 },
  //     sportFrecuency: '',
  //     trainningDays: ['monday', 'wednesday'],
  //   },
  // };

  return (
    <div>
      <h1>Programa contratado</h1>
      <h3>Selecciona el cliente al que quieres agregar el programa</h3>
      {clients &&
        clients.map((client) => {
          return <ClientPreview {...client} />;
        })}
    </div>
  );
}

export default NewProgram;
