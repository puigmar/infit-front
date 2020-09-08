import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { createExercise } from '../services/exercise/exercise.service';
import { getTokenUser } from '../helpers/authHelpers';

import {
  handleImageUpload,
  handleVideoUpload,
} from '../services/authenticate/auth-client.service';
import '../../node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';

function NewExercise() {
  const { user } = WithAuth();

  const [coach, setCoach] = useState(getTokenUser());
  const [isVideo, setIsVideo] = useState(false);
  const [exercise, setExercise] = useState({
    coachID: user._id,
    title: '',
    image: '',
    video: '',
    description: '',
    rest: {
      minute: 0,
      second: 0,
    },
    series: 0,
    repetition: 0,
  });

  const [rest, setRest] = useState({
    minute: 0,
    second: 0,
  });

  const getCoach = async (user) => {
    try {
      const coachValue = await getUser(user);
      setCoach(coachValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoach(coach);
  }, []);

  // el objetivo del programa será el objetivo escogido por el cliente

  const handleChangeValues = (event) => {
    event.preventDefault();
    const { name, value, id } = event.target;

    if (id.includes('rest')) {
      setRest({ ...rest, [name]: value });
      setExercise({ ...exercise, rest: { ...rest, [name]: value } });
      return;
    }
    if (name === 'video') {
      if (value === '') {
        setExercise({
          ...exercise,
          video: value,
        });
        setIsVideo(false);
        return;
      }
      setExercise({
        ...exercise,
        video: value,
      });
      setIsVideo(true);
    }

    setExercise({ ...exercise, [name]: value });
    console.log(exercise)
  };

  const handleChangeVideoUrl = () => {
    if (exercise.video === '') {
      setIsVideo(false);
      return;
    }
    setIsVideo(true);
  };

  const handleChangeMedia = async (e) => {
    const inputFile = e.currentTarget;
    const uploadData = new FormData();
    uploadData.append(inputFile.name, inputFile.files[0]);

    let media;
    switch (inputFile.name) {
      case 'image':
        media = await handleImageUpload({ formData: uploadData });
        setExercise({
          ...exercise,
          image: media.media_url,
        });
        break;
      case 'video':
        media = await handleVideoUpload({ formData: uploadData });
        setExercise({
          ...exercise,
          video: media.media_url,
        });
        break;
      default:
        return;
    }

    console.log('Exercise: ', exercise);
  };

  const createNewExercise = (event) => {
    event.preventDefault();
    createExercise(exercise);
    setExercise({
      title: '',
      image: '',
      video: '',
      description: '',
      rest: {
        minute: 0,
        second: 0,
      },
      series: 0,
      repetition: 0,
    });
  };

  return (
    <div>
      <h1>Crea tu nuevo ejercicio</h1>
      <form onSubmit={(e) => createNewExercise(e)}>
        <label htmlFor='input-title'>Titulo</label>
        <input
          type='text'
          value={exercise.title}
          name='title'
          id='input-title'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='input-objective'>Description</label>
        <input
          type='text'
          name='description'
          value={exercise.description}
          id='input-objective'
          onChange={(e) => handleChangeValues(e)}
        />
        <div className='wrapImage'>
          {exercise.image !== '' ? (
            <img src={exercise.image} alt='exercisePicture' />
          ) : (
            ''
          )}
        </div>
        <label htmlFor='input-pictureProgram'>Image</label>
        <input
          type='file'
          name='image'
          value={exercise.picture}
          id='input-pictureProgram'
          onChange={(e) => handleChangeMedia(e)}
        />
        <div className='wrapImage'>
          {isVideo && <Player playsInline src={exercise.video} />}
        </div>
        <label htmlFor='input-pictureProgramVideo'>Video</label>
        <input
          type='text'
          name='video'
          value={exercise.video}
          id='input-pictureProgramVideo'
          onChange={(e) => handleChangeValues(e)}
        />
        <button type='button' onClick={() => handleChangeVideoUrl()}>
          Cargar vídeo
        </button>

        <label htmlFor='input-set'>Series</label>
        <input
          type='number'
          name='series'
          value={exercise.series}
          id='input-set'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='input-repetition'>Repeticiones</label>
        <input
          type='number'
          name='repetition'
          value={exercise.repetition}
          id='input-repetition'
          onChange={(e) => handleChangeValues(e)}
        />
        <p>Rest</p>
        <label htmlFor='rest-minute'>Minutos</label>
        <input
          type='text'
          name='minute'
          value={exercise.rest.minute}
          id='rest-name'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='rest-second'>Segundos</label>
        <input
          type='text'
          name='second'
          value={exercise.rest.second}
          id='rest-duration'
          onChange={(e) => handleChangeValues(e)}
        />

        <input type='submit' value='Nuevo Ejercicio!' />
      </form>
    </div>
  );
}

export default NewExercise;
