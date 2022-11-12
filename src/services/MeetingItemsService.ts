import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5082/api/Account/';

class MeetingItemsService {
  getAllMeetingItems() {
    return axios.get(API_URL);
  }
  addMeetingItems(username: string, email: string, password: string) {
    return axios.post(API_URL + 'register', {
      username,
      email,
      password
    });
  }
  getAllMeetingItemsByType() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAllMeetingItemsByMeetingId() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAllMeetingItemsByUserId() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new MeetingItemsService();