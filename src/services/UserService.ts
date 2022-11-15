import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_RESOLUTION_SYSTEM_API}/Account/`;

class UserService {
  getMeetings() {
    return axios.get(API_URL);
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();