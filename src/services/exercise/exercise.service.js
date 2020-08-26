import AxiosCredentials from '../axios/credentials';

export async function getExercisesByCoach( coachID ) {
  try {
    const exercises = AxiosCredentials.post(`/exercise/${coachID}`).then(({data}) => data);
    
    return exercises;
  } catch (error) {
    console.log(error);
  }
}

export async function createNewExercise({values}) {
  
}