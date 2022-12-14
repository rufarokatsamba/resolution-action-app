import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.VUE_APP_RESOLUTION_SYSTEM_API}/MeetingItem/`;

type meetingItem = {
  meetingItem: "";
  itemComment: "";
  StatusId: 1;
  dueDate: "";
  personResponsible: "";
  MeetingId: "";
};
type updateMeetingItem = {
  meetingItem: "";
  itemComment: "";
  StatusId: 1;
  dueDate: "";
  personResponsible: "";
  id: "";
  IsClosed:false;
};

class MeetingItemsService {
  getAllMeetingItems() {
    return axios.get(API_URL);
  }
  addMeetingItems(meetingItems: meetingItem[]) {
     return axios.post(API_URL,meetingItems 
    );
  }
  addMeetingItem(
    meetingItem: string,
    dueDate: string,
    personResponsible: string,
    itemComment: string,
    statusId: number,
    meetingId: number
  ) {
    const isClosed = false;
    return axios.post(API_URL, {
      meetingItem,
      personResponsible,
      dueDate,
      itemComment,
      statusId,
      isClosed,
      meetingId,
    });
  }
  updateMeetingItems(meetingItems: updateMeetingItem[]
  ) {
    return axios.put(API_URL,meetingItems 
      );
  }
  getAllMeetingItemsByType() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getAllMeetingItemsByMeetingId() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAllMeetingItemsByUserId() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new MeetingItemsService();
