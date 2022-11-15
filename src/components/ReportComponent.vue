<template>
    <MainLayout>
      <div
        id="main-content"
        class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
      >
        <main>
          <div class="pt-6 px-4">
            <div
              class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"
            >
              <div
                class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="flex-shrink-0">
                    <h3 class="text-l font-bold text-gray-900">
                      Reports Page 
                    </h3>
                    <h4>Coming Soon!!</h4>
                  </div>
                  <div
                    class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                  >
                  </div>
                </div>
                <div id="main-chart">
                
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
  export default class ReportComponent extends Vue {
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
  