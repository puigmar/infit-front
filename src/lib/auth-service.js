import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }

  signup({ username, password, isCoach }) {
    return (
      this.auth
      .post(`${isCoach ? 'coach' : 'client'}/auth/signup` , { username, password })
      .then(({ data }) => data));
  }

  login({ username, password, isCoach }) {
    return this.auth
      .post(`${isCoach ? 'coach' : 'client'}/auth/login` , { username, password })
      .then(({ data }) => data);
  }

  logout(isCoach) {
    return this.auth.post(`${isCoach ? 'coach' : 'client'}/auth/logout`, {}).then(({ data }) => data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
