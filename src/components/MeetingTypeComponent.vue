<template>
  <MainLayout>
    <div
      id="main-content"
      class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
    >
      <main>
        <div class="pt-6 px-4 mb-8">
          <div
            class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"
          >
            <div
              class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-1"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex-shrink-0">
                  <h3 class="text-l font-bold text-gray-900 pl-5">
                    Meeting Type
                  </h3>
                </div>
              </div>
              <div id="main-chart">
                <div class="block p-6 rounded-lg max-w-md">
                  <form>
                    <div class="form-group mb-6">
                      <input
                        v-model="meeting.description"
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="meetingtypename"
                        placeholder="Name"
                      />
                    </div>

                    <div
                      v-if="messageSuccess"
                      @click.prevent="closeSuccess"
                      id="alert-border-3"
                      class="flex p-4 mb-4 bg-green-100 border-t-4 border-green-500 dark:bg-green-200"
                      role="alert"
                    >
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-green-700"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <div class="ml-3 text-sm font-medium text-green-700">
                        {{ message }}
                      </div>
                      <button
                        type="button"
                        class="ml-auto -mx-1.5 -my-1.5 bg-green-100 dark:bg-green-200 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 dark:hover:bg-green-300 inline-flex h-8 w-8"
                        data-dismiss-target="#alert-border-3"
                        aria-label="Close"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
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
                    </div>
                    <div
                      v-if="showErrMessage && message"
                      @click.prevent="closeFail"
                      class="bg-red-100 rounded-lg py-4 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full"
                      role="alert"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="times-circle"
                        class="w-4 h-4 mr-2 fill-current"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                        ></path>
                      </svg>
                      {{ message }}
                    </div>
                    <button
                      @click.prevent="createType"
                      type="submit"
                      class="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div
              class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2"
            >
              <div class="rounded mt-6 h-60 overflow-y-auto scrollbar">
                <table class="min-w-max w-full table-auto">
                  <thead>
                    <tr
                      class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal"
                    >
                      <th class="py-3 px-6 text-left">Id</th>
                      <th class="py-3 px-6 text-left">Description</th>
                      <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody v-for="type in content" :key="type.id" class="text-gray-600 text-sm font-light">
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                      <td class="py-3 px-6 text-left whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="mr-2">
                           
                          </div>
                          <span class="font-medium">{{type.id}}</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <div class="mr-2">
                          </div>
                          <span>{{type.description}}</span>
                        </div>
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
      </main>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MeetingTypeService from "@/services/MeetingTypeService";

import { namespace } from "vuex-class";
import MainLayout from "./layouts/MainLayout.vue";
const Auth = namespace("Auth");

@Component({
  components: {
    MainLayout,
  },
})
export default class MeetingTypeComponent extends Vue {
  private content = [];
  private meeting: any = { description: "" };
  private message = "";
  private showErrMessage = false;
  private messageSuccess = "";

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
  closeSuccess() {
    this.messageSuccess = "";
  }
  closeFail() {
    this.showErrMessage = true;
  }
  logOut() {
    this.signOut();
    this.$router.push("/login");
  }
  mounted() {
    this.loadTypes();
  }
  loadTypes(){
    MeetingTypeService.getAllMeetingTypes().then(
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
  createType() {
    if (this.meeting.description) {
      MeetingTypeService.addMeetingType(this.meeting.description).then(
        (data) => {
          this.message = "Creation Successful";
          this.messageSuccess = "show";
          this.loadTypes();
        },
        (error) => {
          this.message = "Failed";
          this.showErrMessage = true;
        }
      );
    }
  }
}
</script>
