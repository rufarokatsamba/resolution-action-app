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
                
                </div>
              </div>
              <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div class="mb-4 flex items-center justify-between">
                  <div>
                    <h3 class="text-l font-bold text-gray-900 mb-2">
                      Latest Meeting Items
                    </h3>
                    <span class="text-base font-normal text-gray-500"
                      >This is a list of latest meeting items</span
                    >
                  </div>
                </div>
                <div class="flex flex-col mt-8">
                  <div class="overflow-x-auto rounded-lg">
                    <div class="align-middle inline-block min-w-full">
                      <div class="shadow overflow-hidden sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Item
                              </th>
                              <th
                                scope="col"
                                class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Due Date
                              </th>
                              <th
                                scope="col"
                                class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Actioned By
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white">
                            <tr>
                              <td
                                class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                              >
                                Payment from
                                <span class="font-semibold">Bonnie Green</span>
                              </td>
                              <td
                                class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"
                              >
                                Apr 23 ,2021
                              </td>
                              <td
                                class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"
                              >
                                $2300
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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
  