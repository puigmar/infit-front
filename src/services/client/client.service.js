import AxiosCredentials from '../axios/credentials';

export async function getClientsByCoach( coachID ) {
  try {
    const clients = await AxiosCredentials.post(`/client/auth/coach/${coachID}`).then(({data}) => data);
    return clients;
  } catch (error) {
    console.log(error);
  }
}
