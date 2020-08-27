import AxiosCredentials from '../axios/credentials';

export async function getClientsByCoach( coachID ) {
  try {
    console.log('coachID: ------>', {coachID})
    const clients = AxiosCredentials.post(`/client/auth/coach/${coachID}`).then(({data}) => data);
    
    return clients;
  } catch (error) {
    console.log(error);
  }
}