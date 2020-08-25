import AxiosCredentials from '../axios/credentials';

export async function getUser(user){
  console.log('coach service',user)
  const url = `${user.isCoach ? '/coach' : '/client'}/auth/${user._id}`;
  console.log('getUser Url', url)
  try {


    const user = await AxiosCredentials.post(`${url}`).then(({data})=> data)
    console.log('get user', user)
    return user;
  } catch (error) {
    console.log(error)
  }
}