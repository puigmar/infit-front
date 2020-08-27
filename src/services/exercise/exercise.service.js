import AxiosCredentials from '../axios/credentials';

export async function getExercisesByCoach( coachID ) {
  try {
    console.log('cocheID: ------>', {coachID})
    const exercises = AxiosCredentials.post(`/exercise/${coachID}`).then(({data}) => data);
    
    return exercises;
  } catch (error) {
    console.log(error);
  }
}

export async function createExercise( values ) {
  try {
    AxiosCredentials.post('/exercise/newExercise', {...values});
  } catch (error) {
    
  }
}
