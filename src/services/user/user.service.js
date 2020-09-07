import AxiosCredentials from '../axios/credentials';

export async function getUser(user){
  const url = `${user.isCoach ? '/coach' : '/client'}/auth/${user._id}`;
  try {
    const user = await AxiosCredentials.post(`${url}`).then(({data})=> data);
    return user;
  } catch (error) {
    console.log(error)
  }
}

export async function getClientId(clientId){
  console.log(clientId)
  const url = `/client/auth/id/${clientId}`;
  try {
    const user = await AxiosCredentials.post(`${url}`).then(({data})=> data);
    return user;
  } catch (error) {
    console.log(error)
  }
}

export async function getIdClient(clientId){
  const url = `/client/auth/clientID/${clientId}`;
  try {
    const user = await AxiosCredentials.get(`${url}`).then(({data})=> data);
    return user;
  } catch (error) {
    console.log(error)
  }
}


export async function filterByAvailability(min, max) {
  try {
    const theCoach = await AxiosCredentials.post('/coaches/byAvailability', {min, max}).then(({data}) => data);
    return theCoach;
  } catch (error) {
    console.log(error);
  }
}

export async function filterByCallAvailability(arrayCoaches) {
  try {
    const calendarAvailability = await AxiosCredentials.post('/coaches/byCallAvailability', {availableCoaches: arrayCoaches}).then(({data}) => data);
    return calendarAvailability;
  } catch (error) {
    console.log(error);
  }
}