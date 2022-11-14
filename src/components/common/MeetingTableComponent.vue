<template>
  <div class="overflow-x-auto">
    <div class="min-w-screen flex font-sans rounded">
      <div class="w-full">
        <div class="rounded mt-6 h-60 overflow-y-auto scrollbar">
          <table class="min-w-max w-full table-auto">
            <thead>
              <tr
                class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal"
              >
                <th class="py-3 px-6 text-left">id</th>
                <th class="py-3 px-6 text-left">Identifier</th>
                <th class="py-3 px-6 text-center">Description</th>
                <th class="py-3 px-6 text-center">Date</th>
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody v-for="meeting in content" :key="meeting.id" class="text-gray-600 text-sm font-light">
              <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2">
                    </div>
                    <span class="font-medium">{{meeting.id}}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <div class="mr-2">
                      
                    </div>
                    <span>{{meeting.identifier}}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex items-center justify-center">
                    {{meeting.meetingType.description}}
                  </div>
                </td>
                <td class="py-3 px-6 text-center">
                  <span
                    >{{meeting.meetingDateAndTime}}</span
                  >
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <div
                      class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div
                      class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                    <div
                      class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MeetingService from "@/services/MeetingService";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {},
})
export default class MeetingTableComponent extends Vue {
  private content = "";
  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  get loggedIn(): boolean {
    if (this.currentUser != null) {
      return true;
    } else {
      this.signOut();
      this.$router.push("/login");
    }
    return false;
  }
  logOut() {
    this.signOut();
    this.$router.push("/login");
  }
  mounted() {
    MeetingService.getAllMeetings().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
}
</script>
