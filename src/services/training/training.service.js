import AxiosCredentials from '../axios/credentials';

export async function getTraining(userID) {
  try {
    return await AxiosCredentials.post('/training/', { userID }).then(({data}) => data);
  } catch (error) {
    console.log(error)
  }
}

export async function createTraining({...values}) {
  try {
    const training = await AxiosCredentials.post('/training/newTraining', {...values}).then(({data}) => data);
    return training;
  } catch (error) {
    console.log(error)
  }
}
