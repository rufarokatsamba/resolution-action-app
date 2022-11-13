import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://localhost:7266/api/Meeting/';

class MeetingService {
  getAllMeetings() {
    return axios.get(API_URL);
  }
  addMeeting(identifier: string, meetingDateAndTime: string, meetingTypeId: number) {
    return axios.post(API_URL, {
      identifier,
      meetingDateAndTime,
      meetingTypeId,
    });
  }
  getMeetingById(id: number) {
    return axios.get(API_URL + '/'+ id, { headers: authHeader() }); 
  }
}

export default new MeetingService();