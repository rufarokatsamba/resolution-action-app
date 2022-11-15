<template>
  <MainLayout>
    <div
      id="main-content"
      class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
    >
      <main>
        <div class="px-4">
          <div class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="flex items-center">
                        <div class="flex-shrink-0">
                           <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ meeetingsCount}}</span>
                           <h3 class="text-base font-normal text-gray-500">Total Meetings</h3>
                        </div>
                        <div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                        </div>
                     </div>
                  </div>
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="flex items-center">
                        <div class="flex-shrink-0">
                           <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ meeetingItemsCount}}</span>
                           <h3 class="text-base font-normal text-gray-500">Meeting Items Total</h3>
                        </div>
                        <div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                          
                        </div>
                     </div>
                  </div>
                  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                     <div class="flex items-center">
                        <div class="flex-shrink-0">
                           <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ openItemsCount}}</span>
                           <h3 class="text-base font-normal text-gray-500">Unclosed Items</h3>
                        </div>
                        <div class="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                        </div>
                     </div>
                  </div>
          </div>
        </div>
        <div class="pt-6 px-4">
         
          <div
            class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-1 gap-4"
          >
            <div
              class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex-shrink-0">
                  <h3 class="text-l font-bold text-gray-900">
                    Recent Meetings
                  </h3>
                </div>
                <div
                  class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                >
                  <router-link to="/meeting" replace
                    ><button
                      class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      View More
                    </button>
                  </router-link>
                </div>
              </div>
              <div id="main-chart">
                <DashBoardMeetingCard :meetings="meetings" />
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
import MeetingItemsService from "@/services/MeetingItemsService";
import Footer from "@/components/common/FooterComponent.vue";
import DashBoardMeetingCard from "@/components/common/DashBoardMeetingCard.vue";

import { namespace } from "vuex-class";
import MainLayout from "./layouts/MainLayout.vue";
const Auth = namespace("Auth");

@Component({
  components: {
    Footer,
    DashBoardMeetingCard,
    MainLayout,
  },
})
export default class Home extends Vue {
  private content = "";
  private meetings = [];
  private meetingsItems = [];
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
    this.loadMeetingItems();
    this.loadMeetings();
  }

  loadMeetings() {
    MeetingService.getAllMeetings().then(
      (response) => {
        this.meetings = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
  get meeetingsCount(): number {
    if(this.meetings){
      return this.meetings.length
    }
    else{
      return 0;
    }
  }
  get meeetingItemsCount(): number {
    if(this.meetingsItems){
      return this.meetingsItems.length
    }
    else{
      return 0;
    }
  }
  get openItemsCount(): number {
    if(this.meetingsItems){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return this.meetingsItems.filter((x) => x.isClosed == false).length
    }
    else{
      return 0;
    }
  }
  loadMeetingItems() {
    MeetingItemsService.getAllMeetingItems().then(
      (response) => {
        this.meetingsItems = response.data;
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
