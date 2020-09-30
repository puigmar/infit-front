import AxiosCredentials from '../axios/credentials';

export async function getExercisesByCoach( userID ) {
  try {
    const exercises = AxiosCredentials.post(`/exercise/coach/${userID}`).then(({data}) => data);
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
