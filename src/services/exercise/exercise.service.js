import AxiosCredentials from '../axios/credentials';

export async function getExercisesByCoach( coachID ) {
  try {
    const exercises = AxiosCredentials.post(`/exercise/coach/${coachID}`).then(({data}) => data);
    console.log('esto es del servicio', exercises)
    return exercises;
  } catch (error) {
    console.log(error);
  }
}

export async function createExercise( values ) {
  try {
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
