import AxiosCredentials from '../axios/credentials';

export async function nextMeeting(userID, programID) {
  try {
    const nextMeeting = await AxiosCredentials.post('/meeting/next', { userID, programID }).then(({data}) => data);
    return nextMeeting[0];
  } catch (error) {
    console.log(error);
  }
}