import Axios from 'axios';

const TOKEN_KEY = 'INFIT_TOKEN'; 

export const setToken = (token) =>  localStorage.setItem(TOKEN_KEY, token);

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const deleteToken = () => localStorage.removeItem(TOKEN_KEY);

export function initAxiosInterceptors() {
  Axios.interceptors.request.use( config => {
    const token = getToken();

    if(token) config.headers.Authorization = `bearer ${token}`;
    
    return token;
  });

  Axios.interceptors.response.use(
    function(response){
      return response;
    },
    function(error){
      if(error.response.status(401)){
        throw new Error(`${error.config.url} not found`);
      }
      if(error.response.status(403)){
        console.log('No tiene permiso');
      }
      if(error.response.status(400)){
        console.log('No hay username o password');
      }
    }
  )
}