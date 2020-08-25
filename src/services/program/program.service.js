import AxiosCredentials from '../axios/credentials';

export async function getProgramByUserId(clientID, coachID) {
  console.log('clientDI', clientID)
  console.log('coachID', coachID)
  try {
    const program = await AxiosCredentials.post(`/program/${clientID}/${coachID}`).then(({data}) => data);
    return program;
  } catch (error) {
    console.log(error);
  }
}