import AxiosCredentials from '../axios/credentials';

export async function signup(user, client) {
  const { username, password, isCoach } = user;
  
  try {
    const signUpUser =  await AxiosCredentials.post('coach/auth/signup', {
      username,
      password,
      client
    })
    return signUpUser;
  }
  catch (error) {
    console.log(error);
  }
}

export async function login({ username, password, isCoach }) {
  try {
    const userLogged = await AxiosCredentials.post('/coach/auth/login', {
      username,
      password,
    }).then(({data}) => data);
    return userLogged;
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
    '/coach/auth/uploadPhotoAvatar',
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
    const url = isCoach ? '/coach' : '/client';
    console.log(`${url}/auth/logout`);
    return await AxiosCredentials.post(
      `${url}/auth/logout`,
      {}
    )
  } catch (error) {
    console.log(error);
  }
}

export async function auth() {
  try {
    return await AxiosCredentials.get(
      '/generic/auth/me',{}
    ).then(({ data }) => data);
  } catch (error) {
    console.log(error);
  }
}