import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_RESOLUTION_SYSTEM_API}/MeetingType/`;

class MeetingTypeService {
  getAllMeetingTypes() {
    return axios.get(API_URL);
  }

  addMeetingType(description: string) {
    return axios.post(API_URL, {
      description
    });
  }

  getMeetingTypeById(id: number) {
    return axios.get(API_URL + '/'+ id, { headers: authHeader() }); 
  }

}

export default new MeetingTypeService();