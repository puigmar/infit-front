import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { getProgramByUserId } from '../services/program/program.service';

function NewProgram() {
  const { user } = WithAuth();
  const [program, setProgram] = useState(initialState)
    //LLAMAR AL PROGRAMA
    const programById = async (user, isCoach) => {
      try {
        const program = 
      } catch (error) {
        
      }
    }
    // EL PROGRAMA DEBE TENER MI COACHID
    //PINTAR SUS ATRIBUTOS  


    //TODO DELETE MOCK
    const userMock = {
      _id: '5f44e55a186acf0b52cad177',
      isCoach: true,
      username: '2',
      password: '$2b$10$LCbudLK5fTfJwzxQa15RLO7yTgYIEp3XLFt4LoBusB1THEI3D1D3a',
      created_at: { $date: '2020-08-25T10:18:02.308Z' },
      updated_at: { $date: '2020-08-25T10:18:02.308Z' },
      __v: 0,
    };

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoach(userMock);

  }, []);

  const [a, setA] = useState({
    clientID: '',
    coachID: '',
    title: '',
    picture: '',
    objective: '',
    pack: {
      name: '',
      duration: '',
      price: 0,
      weekSessions: '',
    },
    initialDay: '',
  });

  const [pack, setPack] = useState({
    name: '',
    duration: '',
    price: 0,
    weekSessions: '',
  })

  // el objetivo del programa será el objetivo escogido por el cliente
  useEffect(() => {
    if(user) setProgram({ ...program, coachID: user._id });
  }, []);

  const handleChangeValues = (event) => {
    const { name, value, id } = event.target;

    if(id.includes('pack')){
      setPack({...pack, [name]: value})
      setProgram({...program, pack: { ...pack, [name]: value }});
      return;
    }

    setProgram({ ...program, [name]: value });
  };

  return (
    <div>
      <h1>Crea tu nuevo programa</h1>
      <form action='post'>
        <label htmlFor='input-title'>Titulo</label>
        <input
          type='text'
          value={program.title}
          name='title'
          id='input-title'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='input-objective'>Objetivo</label>
        <input
          type='text'
          name='objective'
          value={program.objective}
          id='input-objective'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='input-pictureProgram'>Picture</label>
        <input
          type='file'
          name='pictureProgram'
          value={program.picture}
          id='input-pictureProgram'
          onChange={(e) => handleChangeValues(e)}
        />

        <p>Pack</p>
        <label htmlFor='pack-name'>Name</label>
        <input
          type='text'
          name='name'
          value={program.pack.name}
          id='pack-name'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='pack-duration'>Duration</label>
        <input
          type='text'
          name='duration'
          value={program.pack.duration}
          id='pack-duration'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='pack-price'>Price</label>
        <input
          type='text'
          name='price'
          value={program.pack.price}
          id='pack-price'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='pack-weekSession'>Session per week</label>
        <input
          type='text'
          name='weekSessions'
          value={program.pack.weekSessions}
          id='pack-weekSession'
          onChange={(e) => handleChangeValues(e)}
        />
        <input type='submit' value='Nuevo programa!'/>
      </form>
    </div>
  );
}

export default NewProgram;
