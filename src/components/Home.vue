<template>
  <div>
    <nav class="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
            >
              <svg
                id="toggleSidebarMobileHamburger"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                class="w-6 h-6 hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <a href="#" class="text-xl font-bold flex items-center lg:ml-2.5">
              <span class="self-center whitespace-nowrap text-[#EC5252]"
                >ChilliSoft</span
              >
            </a>
          </div>
          <div class="flex items-center">
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              class="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
            >
              <span class="sr-only">Search</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div v-if="loggedIn" class="hidden lg:flex items-center">
              <div class="-mb-1">
                <router-link to="/profile" class="nav-link">
                  <span
                    class="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >{{ currentUser.userName }}</span
                  >
                </router-link>
              </div>

              <div class="-mb-1">
                <a class="nav-link" href @click.prevent="logOut">
                  <span
                    class="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >LogOut</span
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="flex overflow-hidden bg-white pt-16">
      <aside
        id="sidebar"
        class="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar"
      >
        <div
          class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0"
        >
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex-1 px-3 bg-white divide-y space-y-1">
              <ul class="space-y-2 pb-2">
                <li>
                  <form action="#" method="GET" class="lg:hidden">
                    <label for="mobile-search" class="sr-only">Search</label>
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="email"
                        id="mobile-search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </li>
                <li>
                  <router-link
                    to="/home"
                    class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                  >
                    <svg
                      class="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path
                        d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                      ></path>
                    </svg>
                  
                      <span class="ml-3">Dashboard</span>
                
                  </router-link>
                </li>
                <li>
              
                  <router-link to="/home/meeting"
                  
                    class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                  >
                    <svg
                      class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      ></path>
                    </svg>
                   
                      <span class="ml-3 flex-1 whitespace-nowrap"
                        >Meetings</span>
                     
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/home/reports"
                    class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                  >
                    <svg
                      class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>

                    <span class="ml-3 flex-1 whitespace-nowrap">Reports</span>
                  </router-link>
                </li>                
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div
        class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        id="sidebarBackdrop"
      ></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MeetingService from "@/services/MeetingService";
import DashBoard from "@/components/DashBoard.vue";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {
    DashBoard,
  },
})
export default class Home extends Vue {
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
