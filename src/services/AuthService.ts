import axios from 'axios';

const API_URL = 'http://localhost:5082/api/Account/';

class AuthService {
  login(username: string, password: string) {
    const email = username;
    return axios
      .post(API_URL + 'login', {
        email,
        password
      })
      .then(response => {
        if(response.data.message != null ){
          return response.data;
        }
        else if(response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + 'register', {
      username,
      email,
      password
    });
  }
}

export default new AuthService();