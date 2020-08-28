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
  console.log(clientId)
  const url = `/client/auth/id/${clientId}`;
  console.log('Esta es la url', url)
  try {
    console.log('Esta es la url try', url)
    const user = await AxiosCredentials.post(`${url}`).then(({data})=> data);
    console.log('Este es el resultado', user)
    return user;
  } catch (error) {
    console.log(error)
  }
}

export async function getIdClient(clientId){
  console.log(clientId)
  const url = `/client/auth/clientID/${clientId}`;
  console.log('Esta es la url', url)
  try {
    console.log('Esta es la url try', url)
    const user = await AxiosCredentials.post(`${url}`).then(({data})=> data);
    console.log('Este es el resultado', user)
    return user;
  } catch (error) {
    console.log(error)
  }
}