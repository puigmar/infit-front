import AxiosCredentials from '../axios/credentials';

export async function getClientsByCoach( coachID ) {
  try {
    console.log('coachID de clientes: ------>', {coachID})
    const clients = await AxiosCredentials.post(`/client/auth/coach/${coachID}`).then(({data}) => data);
    console.log('clientes de coach', clients)
    return clients;
  } catch (error) {
    console.log(error);
  }
}
