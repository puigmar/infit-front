import AxiosCredentials from '../axios/credentials';

export async function nextMeeting(clientID, programID) {
  try {
    const nextMeeting = await AxiosCredentials.post('/meeting/next', {clientID, programID}).then(({data}) => data);
    return nextMeeting[0];
  } catch (error) {
    console.log(error);
  }
}