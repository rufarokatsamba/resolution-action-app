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
                    <h3 class="text-l font-bold text-gray-900">Meetings Items</h3>
                  </div>
                  <div
                    class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                  >                    
                  </div>
                </div>
                <div id="main-chart" v-if="meetingItems"> 
                    <MeetingItemsComponentTable
                    :meetingsItems="meetingItems" /> 
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
  import Footer from "@/components/common/FooterComponent.vue";
  import MeetingItemsComponentTable from "@/components/common/MeetingItemsComponentTable.vue";
  import MeetingItemsService from "@/services/MeetingItemsService";
  import { namespace } from "vuex-class";
  import MainLayout from "./layouts/MainLayout.vue";
  const Auth = namespace("Auth");
  
  @Component({
    components: {
      Footer,
      MainLayout,
      MeetingItemsComponentTable,
    },
  })
  export default class MeetingItemsComponent extends Vue {
    private content = "";
    @Auth.State("user")
    private currentUser!: any;
    private showMeetings = true;
    private meetingsItems = [];
    private meetingItems = [];
  
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
    mounted() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.content=this.$route.params.type

    }
  }
  </script>
  