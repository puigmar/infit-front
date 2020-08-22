import AxiosCredentials from '../axios/credentials';

export async function getTraining(userID , isCoach) {
  try {
    return await AxiosCredentials.post(`${isCoach ? 'coach' : 'client'}/auth/user/training/:clientID`, { userID }).then(({data}) => data);
  } catch (error) {
    console.log(error)
  }
}
