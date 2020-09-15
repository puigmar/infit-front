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

export async function getProgramByClientID(userID) {
  try{
    const program = await AxiosCredentials.post(`/program/${userID}`);
    return program.data[0];
  }
  catch(err){
    console.log(err)
  }
}

export async function getProgramByID(programID) {
  console.log('programID --------->', programID)
  try{
    const program = await AxiosCredentials.get(`/program/getProgram/${programID}`);
    return program.data;
  }
  catch(err){
    console.log(err)
  }
}