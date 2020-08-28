import React, { useState, useEffect } from 'react';
import WithAuth from '../components/AuthProvider';
import { getUser } from '../services/user/user.service';
import { createExercise } from '../services/exercise/exercise.service';
import { handleImageUpload, handleVideoUpload } from '../services/authenticate/auth-client.service';
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';

function NewExercise() {
  const { user } = WithAuth();
  const [coach, setCoach] = useState({});
  const [videoUrl, setVideoUrl] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [exercise, setExercise] = useState({
    coachID: '',
    title: '',
    image: '',
    video: '',
    rest: {
      minute: 0,
      second: 0,
    },
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
    getCoach(user);
  }, []);

  // el objetivo del programa será el objetivo escogido por el cliente
  useEffect(() => {
    setExercise({ ...exercise, coachID: coach.coachID });
  }, [coach]);

  const handleChangeValues = (event) => {
    const { name, value, id } = event.target;

    if (id.includes('rest')) {
      setRest({ ...rest, [name]: value });
      setExercise({ ...exercise, rest: { ...rest, [name]: value } });
      return;
    }

    setExercise({ ...exercise, [name]: value });
  };

  const handleChangeVideoUrl = () => {
    setExercise({
      ...exercise, video: videoUrl
    })
    setIsVideo(true);
  }

  const handleInputVideo = (e) => {
    if(e.target.value === ''){
      return;
    }
    setVideoUrl(e.target.value);
    setIsVideo(false);
  }
  

  const handleChangeMedia = async (e) => {
    const inputFile = e.currentTarget;
    const uploadData = new FormData();
    uploadData.append(inputFile.name, inputFile.files[0]);

    let media;
    switch(inputFile.name){
      case 'image':
        media = await handleImageUpload({formData: uploadData});
        setExercise({
          ...exercise,
          image: media.media_url
        })
        break;
      case 'video':
        media = await handleVideoUpload({formData: uploadData});
        setExercise({
          ...exercise,
          video: media.media_url
        })
        break;
    }

    console.log('Exercise: ', exercise)

  }

  const createNewExercise = () => {
    createExercise(exercise);
    setExercise({
      coachID: '',
      title: '',
      image: '',
      video: '',
      rest: {
        minute: 0,
        second: 0,
      },
    });
  };
  

  return (
    <div>
      <h1>Crea tu nuevo Ejercicio</h1>
      <form onSubmit={createNewExercise}>
        <label htmlFor='input-title'>Titulo</label>
        <input
          type='text'
          value={exercise.title}
          name='title'
          id='input-title'
          onChange={(e) => handleChangeValues(e)}
        />

        <label htmlFor='input-objective'>Descripcion</label>
        <input
          type='text'
          name='description'
          value={exercise.objective}
          id='input-objective'
          onChange={(e) => handleChangeValues(e)}
        />
        <div className="wrapImage">
          {exercise.image !== '' ? (<img src={exercise.image} />) : ''}
        </div>
        <label htmlFor='input-pictureProgram'>Image</label>
        <input
          type='file'
          name='image'
          value={exercise.picture}
          id='input-pictureProgram'
          onChange={(e) => handleChangeMedia(e)}
        />
        <div className="wrapImage">
          {isVideo &&    
            <Player
              playsInline
              src={videoUrl}
            /> 
          }
        </div>
        <label htmlFor='input-pictureProgramVideo'>Video</label>
        <input
          type='text'
          name='video'
          value={videoUrl}
          id='input-pictureProgramVideo'
          onChange={(e) => handleInputVideo(e)}
        />
        <button type="button" onClick={() => handleChangeVideoUrl()}>Cargar vídeo</button>

        <p>Pack</p>
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
