import axios from 'axios';

const API_URL = 'https://localhost:7266/api/Account/';

class AuthService {
  login(username: string, password: string) {
    const email = username;
    return axios
      .post(API_URL + 'login', {
        email,
        password
      })
      .then(response => {
        if(response.data.ErrorMessage != null ){
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

  register(firstName: string, lastName: string,email: string, password: string) {
    const userName =  email ;
    const confirmationPassword = password;
    const phoneNumber = "+2637899302";

    return axios.post(API_URL + 'Create', {
      userName,
      email,
      password,
      confirmationPassword,
      firstName,
      lastName,
      phoneNumber
    });
  }

  getAllUsers() {
    return axios.get(API_URL + 'GetAll');
  }

  getByID() {
    return axios.get(API_URL + 'GetAll');
  }
}

export default new AuthService();