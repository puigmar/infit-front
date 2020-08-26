import AxiosCredentials from '../axios/credentials';

export async function signup(user, client) {
  const { username, password, isCoach } = user;
  
  try {
    const signUpUser =  await AxiosCredentials.post(`${isCoach ? 'coach' : 'client'}/auth/signup`, {
      username,
      password,
      client
    })
    console.log('signUpUser :', signUpUser)
    return signUpUser;
  }
  catch (error) {
    console.log(error);
  }
}

export async function login({ username, password, isCoach }) {
  const url = `${isCoach ? '/coach' : '/client'}/auth/login`;
  try {
    const userLogged = await AxiosCredentials.post(`${url}`, {
      username,
      password,
    }).then(({data}) => data)
  } catch (error) {
    console.log(error);
  }
}

const errorHandler = (err) => {
  throw err;
};

export async function handleAvatarUpload({ formData, isCoach }) {
  try {
    return await AxiosCredentials.post(
      `${isCoach ? '/coach' : '/client'}/auth/uploadPhotoAvatar`,
      formData
    ).then(({ data }) => data);
  } catch (error) {
    console.log(errorHandler(error));
  }
}

export async function checkExistUSer(username) {
  try {
    return await AxiosCredentials.post('/generic/auth/checkExistUser', {
      username,
    }).then(({ data }) => data);
  } catch (error) {
    console.log(error);
  }
}

export async function logout(isCoach) {
  try {
    return await AxiosCredentials.post(
      `${isCoach ? '/coach' : '/client'}/auth/logout`,
      {}
    )

  } catch (error) {
    console.log(error);
  }
}

export async function auth() {
  try {
    const me = await AxiosCredentials.get('/generic/auth/me',{})
    return me;
  } catch (error) {
    console.log(error);
  }
}