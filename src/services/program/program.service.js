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

export async function getIDInactiveProgram(clientID) {
  try{
    const program = await AxiosCredentials.post(`/program/inactive/${clientID}`);
    return program.data[0];
  }
  catch(err){
    console.log(err)
  }
}