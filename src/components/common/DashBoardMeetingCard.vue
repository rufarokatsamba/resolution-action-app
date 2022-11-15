<template>
  <div class="overflow-x-auto">
    <div class="min-w-screen flex font-sans rounded">
      <div class="w-full">
        <div class="rounded mt-6 h-80 overflow-y-auto scrollbar border-b-2">
          <table class="min-w-max w-full table-auto">
            <thead class="sticky top-0 z-10">
              <tr
                class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal"
              >
                <th class="py-3 px-6 text-left">id</th>
                <th class="py-3 px-6 text-left">Identifier</th>
                <th class="py-3 px-6 text-center">Description</th>
                <th class="py-3 px-6 text-center">Date</th>
                <th class="py-3 px-6 text-center">Meeting Items</th>
              </tr>
            </thead>
            <tbody v-for="meeting in meetings" :key="meeting.id" class="text-gray-600 text-sm font-light">
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
                    </div>
                    <div
                      class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      
                    </div>
                    <div
                      class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      {{ meetingItemsLength(meeting.meetingItems) }}
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
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {},
})
export default class DashBoardMeetingCard extends Vue {
  @Prop({ type: Array }) readonly meetings!: [];
  private content = "";
  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  mounted() {    
    //
  }
  meetingItemsLength(arr: []): number {
    return arr.length;
  }
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
}
</script>
