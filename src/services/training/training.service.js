import AxiosCredentials from '../axios/credentials';

export async function getTraining(trainingID) {
  try {
    const trainings = await AxiosCredentials.post('/training/', { trainingID }).then(({data}) => data);
    return trainings;
  } catch (error) {
    console.log(error)
  }
}
export async function getTrainings({userID, isCoach}) {
  const url = `${isCoach ? '/coach' : '/client'}`;
  try {
    const trainings = await AxiosCredentials.post(`/training/${ url }/${userID}`)
    return trainings;
  } catch (error) {
    console.log(error)
  }
}

export async function createTraining({myExercises, coachID, provClient}) {
  try {
    console.log('values: myTraining',myExercises )
    console.log('values: coachID',coachID )
    console.log('values: provClient',provClient )
    const training = await AxiosCredentials.post('/training/newTraining', {myExercises, coachID, provClient}).then(({data}) => data);
    return training;
  } catch (error) {
    console.log(error)
  }
}
