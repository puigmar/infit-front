import AxiosCredentials from '../axios/credentials';

export async function getExercisesByCoach( coachID ) {
  try {
    const exercises = AxiosCredentials.post(`/exercise/coach/${coachID}`).then(({data}) => data);
    console.log('coachID exercises: ------>', exercises)
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

export async function deleteExercise( exerciseID ) {
  try {
    AxiosCredentials.post('/exercise/delete', {exerciseID});
  } catch (error) {
    console.log(error)
  }
}
