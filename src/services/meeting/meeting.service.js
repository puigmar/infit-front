import AxiosCredentials from '../axios/credentials';

export async function nextMeeting(userID, programID) {
  try {
    const nextMeeting = await AxiosCredentials.post('/meeting/next', { userID, programID }).then(({data}) => data);
    return nextMeeting[0];
  } catch (error) {
    console.log(error);
  }
}

export async function nextCoachMeeting(coachID) {
  try {
    const nextMeeting = await AxiosCredentials.post(`/meeting/coach/${coachID}/next`).then(({data}) => data);
    return nextMeeting;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMeeting(meeting) {
  try {
    const updateMeeting = await AxiosCredentials.put(`/meeting/update`, { meeting }).then(({data}) => data);
    return updateMeeting;
  } catch (error) {
    console.log(error);
  }
}