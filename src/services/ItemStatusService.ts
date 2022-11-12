import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5082/api/Account/';

class ItemStatusService {
  getItemStatus() {
    return axios.get(API_URL);
  }

  getMeetings() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new ItemStatusService();