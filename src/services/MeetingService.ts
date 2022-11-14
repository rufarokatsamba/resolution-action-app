import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://localhost:7266/api/Meeting/';

class MeetingService {
  getAllMeetings() {
    return axios.get(API_URL);
  }
  addMeeting(MeetingDateAndTimeToConvert: string, meetingTypeId: number ,description: string) {
    const identifier = "";
    return axios.post(API_URL, {
      identifier,
      MeetingDateAndTimeToConvert,
      meetingTypeId,
      description
    });
  }
  getMeetingById(id: number) {
    return axios.get(API_URL + '/'+ id, { headers: authHeader() }); 
  }
}

export default new MeetingService();