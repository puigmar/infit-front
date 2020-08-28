import AxiosCredentials from '../axios/credentials';

export async function getUser(user){
  const url = `${user.isCoach ? '/coach' : '/client'}/auth/${user._id}`;
  try {
    const user = await AxiosCredentials.post(`${url}`).then(({data})=> data)
    return user;
  } catch (error) {
    console.log(error)
  }
}

export async function getClientId(clientId){
  const url = `/client/auth/${clientId}`;
  try {
    const user = await AxiosCredentials.post(`${url}`).then(({data})=> data)
    return user;
  } catch (error) {
    console.log(error)
  }
}