import AxiosCredentials from '../axios/credentials';

export async function getExercisesByCoach( userID ) {
  try {
    console.log('esto es del servicio exercise userID', userID)
    const exercises = AxiosCredentials.post(`/exercise/coach/${userID}`).then(({data}) => data);
    console.log('esto es del servicio exercise', exercises)
    return exercises;
  } catch (error) {
    console.log(error);
  }
}

export async function createExercise( values ) {
  try {
    console.log('Estos son los valores ejercicio service', values)
    AxiosCredentials.post('/exercise/newExercise', {...values});
  } catch (error) {
    console.log(error)
  }
}

export async function editExerciseByID( exerciseID, values ) {
  try {
    console.log('Estos son los valores de exerciseEdit', values);
    console.log('Este es el id del exercise', exerciseID)
    await AxiosCredentials.post(`/exercise/editExercise/${exerciseID}`, {...values});
  } catch (error) {
    console.log(error)
  }
}

export async function deleteExerciseByID( exerciseID ) {
  try {
    await AxiosCredentials.post(`/exercise/delete/${exerciseID}`);
  } catch (error) {
    console.log(error)
  }
}
