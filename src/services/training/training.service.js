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

export async function createTraining({myTraining, coachID, provClient}) {
  try {
    const training = await AxiosCredentials.post('/training/newTraining', {myTraining, coachID, provClient}).then(({data}) => data);
    return training;
  } catch (error) {
    console.log(error)
  }
}
