import AxiosCredentials from './axios/credentials';

export async function signup({ username, password, isCoach }) {
  try {
    await AxiosCredentials.post(`${isCoach ? 'coach' : 'client'}/auth/signup`, {
      username,
      password,
    }).then(({ data }) => data);
  } catch (error) {
    console.log(error);
  }
}

export async function login({ username, password, isCoach }) {
  try {
    return await AxiosCredentials.post(
      `${isCoach ? 'coach' : 'client'}/auth/login`,
      {
        username,
        password,
      }
    ).then(({ data }) => data);
  } catch (error) {
    console.log(error);
  }
}

export async function checkExistUSer({ username }) {
  try {
    return await AxiosCredentials.post(
      '/generic/auth/checkExistUser',
      {
        username
      }
    ).then(({ data }) => data);
  } catch (error) {
    console.log(error);
  }
}

export async function logout(isCoach) {
  try {
    return await AxiosCredentials.post(
      `${isCoach ? 'coach' : 'client'}/auth/logout`,
      {}
    ).then(({ data }) => data);
  } catch (error) {
    console.log(error);
  }
}
