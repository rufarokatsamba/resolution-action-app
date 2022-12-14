<template>
  <MainLayout>
    <div
      id="main-content"
      class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
    >
      <main>
        <div class="pt-6 px-4">
          <div class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1">
            <div
              class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex-shrink-0">
                  <h3 class="text-l font-bold text-gray-900"></h3>
                </div>
                <div
                  class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                >
                  <div v-if="showMeetings && showCreateNewButton">
                    <button
                      @click.prevent="createNew"
                      class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Create New
                    </button>
                  </div>
                </div>
              </div>
              <div id="main-chart">
                <div v-if="showMeetingItems== false">
                    <div v-if="showMeetings">
                    <MeetingTableComponent
                    @clicked="onClickChild" />
                    </div>
                    <div v-else>
                    <CreateMeetingComponent />
                  </div>
                </div>
                <div v-else>
                  <MeetingItemsComponentTable
                  :meetingItemsProp = "meetingItemsProp"
                  @loaded="onLoaded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MeetingService from "@/services/MeetingService";
import Footer from "@/components/common/FooterComponent.vue";
import DashBoardMeetingCard from "@/components/common/DashBoardMeetingCard.vue";
import MeetingTableComponent from "@/components/common/MeetingTableComponent.vue";
import MeetingItemsComponentTable from "@/components/common/MeetingItemsComponentTable.vue";
import CreateMeetingComponent from "@/components/common/CreateMeetingComponent.vue";
import { namespace } from "vuex-class";
import MainLayout from "./layouts/MainLayout.vue";
const Auth = namespace("Auth");

@Component({
  components: {
    Footer,
    DashBoardMeetingCard,
    MainLayout,
    MeetingTableComponent,
    CreateMeetingComponent,
    MeetingItemsComponentTable,
  },
})
export default class MeetingComponent extends Vue {
  private content = "";
  @Auth.State("user")
  private currentUser!: any;
  private showMeetings = true;
  private showMeetingItems = false;
  private meetingItems = [];
  private meetingItemsProp = [];
  private showCreateNewButton = true;

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
  createNew() {
    this.showMeetings = false;
  }
  logOut() {
    this.signOut();
    this.$router.push("/login");
  }
  onClickChild(val){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
    this.meetingItems.push(val);
    this.meetingItemsProp.push(this.meetingItems[0]);
    if(this.meetingItemsProp.length > 0){
      this.showMeetingItems = true;
    }
  }
  onLoaded(val){
    this.showCreateNewButton = val
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
