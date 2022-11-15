<template>
  <div class="p-5">
    <div class="mx-4 p-4">
      <div class="flex items-center">
        <div class="flex items-center text-teal-600 relative">
          <div
            @click.prevent="stepNext()"
            class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-bookmark"
            >
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              ></path>
            </svg>
          </div>
          <div
            class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600"
          >
            Meeting Type
          </div>
        </div>
        <div
          ::style="{ 'border-color': stepTwo ? '#319795' : '#e2e8f0' }"
          class="flex-auto border-t-2 transition duration-500 ease-in-out"
        ></div>

        <div class="flex items-center text-gray-500 relative">
          <div
            @click.prevent="stepNext()"
            :style="{ 'border-color': stepTwo ? '#319795' : '#e2e8f0' }"
            class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-mail"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              ></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div
            class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500"
          >
            Meeting Items
          </div>
        </div>
        <div
          :style="{ 'border-color': stepThree ? '#319795' : '#e2e8f0' }"
          class="flex-auto border-t-2 transition duration-500 ease-in-out"
        ></div>
        <div class="flex items-center text-gray-500 relative">
          <div
            @click.prevent="stepNext()"
            :style="{ 'border-color': stepThree ? '#319795' : '#e2e8f0' }"
            class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-database"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </div>
          <div
            class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500"
          >
            Confirm
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 p-4">
      <div>
        <div v-if="currStep == 0" class="flex flex-col md:flex-row">
          <div class="w-full mx-2 flex-1 svelte-1l8159u">
            <div
              class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"
            >
              Type
            </div>
            <div
              class="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u"
            >
              <multiselect
                v-if="options"
                v-model="description"
                :options="options"
                :multiple="false"
                class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              ></multiselect>
            </div>
          </div>
          <div class="w-full mx-2 flex-1 svelte-1l8159u">
            <div
              class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"
            >
              Date
            </div>
            <div
              class="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u"
            >
              <div class="relative">
                <div
                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <datepicker
                  v-model="meeting.meetingDateAndTime"
                  class="p-1 px-2 appearance-none w-full text-gray-800"
                  name="uniquename"
                ></datepicker>
              </div>
            </div>
          </div>
        </div>
        <div v-if="stepTwo" class="flex flex-col md:flex-row">
          <div class="w-full pr-10">
            <div class="rounded mt-6 h-60 overflow-y-auto scrollbar">
              <table class="min-w-max w-full table-auto">
                <thead>
                  <tr class="bg-gray-100 text-gray-600 text-sm leading-normal">
                    <th class="py-3 px-6 text-left">Meeting</th>
                    <th class="py-3 px-6 text-left">Meeting Item</th>
                    <th class="py-3 px-6 text-center">Status</th>
                    <th class="py-3 px-6 text-center">Owner</th>
                    <th class="py-3 px-6 text-center">Select</th>
                  </tr>
                </thead>
                <tbody
                  v-for="items in filteredMeetingItems"
                  :key="items.id"
                  class="text-gray-600 text-sm font-light"
                >
                  <tr class="border-b border-gray-200 hover:bg-gray-100">
                    <td class="py-3 px-6 text-left whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="mr-2"></div>
                        <span class="font-medium">{{
                          prevMeetingIdentifier
                        }}</span>
                      </div>
                    </td>
                    <td class="py-3 px-6 text-left">
                      <div class="flex items-center">
                        <div class="mr-2"></div>
                        <span>{{ items.itemComment }}</span>
                      </div>
                    </td>
                    <td class="py-3 px-6 text-center">
                      <div class="flex items-center justify-center">
                        {{ items.status.description }}
                      </div>
                    </td>
                    <td class="py-3 px-6 text-center">
                      <div class="flex items-center justify-center">
                        {{ items.personResponsible }}
                      </div>
                    </td>
                    <td class="py-3 px-6 text-center">
                      <div class="flex item-center justify-center">
                        <div
                          class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                        >
                          <input
                            v-model="checkedItems"
                            :value="items.id"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-if="stepThree" class="flex flex-col md:flex-row">
          <div class="w-full pr-10">
            <div class="flex items-center justify-between mb-4">
              <div class="flex-shrink-0">
                <h3 class="text-l font-bold text-gray-900">
                  Meeting Items for meeting : {{ newMeetingIdentifier }}
                </h3>
              </div>
              <div>
                <div
                  v-if="showModal"
                  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
                >
                  <div class="relative w-auto my-6 mx-50 max-w-6xl">
                    <!--content-->
                    <div
                      class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                    >
                      <!--header-->
                      <div
                        class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
                      >
                        <h3 class="text-3xl font-semibold">Create Item</h3>
                        <button
                          class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          v-on:click="toggleModal()"
                        >
                          <span
                            class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                          >
                            ×
                          </span>
                        </button>
                      </div>
                      <!--body-->
                      <div class="relative p-6 flex-auto">
                        <form>
                          <div class="-mx-3 md:flex mb-6">
                          <div class="form-group mb-6 px-3"><p class="mb-1">Item</p>
                            <input
                              v-model="meetingItemFields.meetingItem"
                              type="text"
                              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="meetingtypename"
                              placeholder="meeting item"
                            />
                          </div>
                          <div class="form-group mb-6"><p class="mb-1">Date</p>
                            <div
                              class="bg-white  p-1 flex border border-gray-200 rounded svelte-1l8159u"
                            >
                              <div class="relative">
                                
                                <div
                                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                                >
                                </div>
                               
                                <datepicker
                                  v-model="meetingItemFields.dueDate"
                                  class="px-2 appearance-none w-full text-gray-800"
                                  name="uniquename"
                                ></datepicker>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="-mx-3 md:flex mb-6">
                          <div class="form-group mb-6 px-3">
                            <input
                              v-model="meetingItemFields.personResponsible"
                              type="text"
                              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="meetingtypename"
                              placeholder="responsible person"
                            />
                          </div>
                        </div>
                          <div class="-mx-3 md:flex-inline mb-6 px-3">
                          <div class="form-group mb-6">
                            <textarea
                              v-model="meetingItemFields.itemComment"
                              type="text"
                              rows="4"
                              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="meetingtypename"
                              placeholder="comment"
                            />
                          </div>
                        </div>
                        </form>
                      </div>
                      <!--footer-->
                      <div
                        class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"
                      >
                        <button
                          v-on:click="toggleModal()"
                          class="text-base ml-2 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer text-red-500 border duration-200 ease-in-out border-red-500 transition"
                        >
                          Close
                        </button>
                        <button
                         @click.prevent="createMeetingItem"
                          class="text-base ml-2 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-600 bg-teal-600 text-teal-100 border duration-200 ease-in-out border-teal-600 transition"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="showModal"
                  class="opacity-25 fixed inset-0 z-40 bg-black"
                ></div>
              </div>
              <div
                class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
              >
                <button
                  v-on:click="toggleModal()"
                  class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Add Item
                </button>
              </div>
            </div>

            <div class="rounded mt-6 h-60 overflow-y-auto scrollbar" v-if="filteredNewMeetingItems">
              <table class="min-w-max w-full table-auto">
                <thead>
                  <tr class="bg-gray-100 text-gray-600 text-sm leading-normal">
                    <th class="py-3 px-6 text-left">Meeting Id</th>
                    <th class="py-3 px-6 text-left">Meeting Item</th>
                    <th class="py-3 px-6 text-left">Comment</th>
                    <th class="py-3 px-6 text-center">Status</th>
                    <th class="py-3 px-6 text-center">Owner</th>
                  </tr>
                </thead>
                <tbody
                  v-for="items in filteredNewMeetingItems"
                  :key="items.id"
                  class="text-gray-600 text-sm font-light"
                >
                  <tr class="border-b border-gray-200 hover:bg-gray-100">
                    <td class="py-3 px-6 text-left whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="mr-2"></div>
                        <span class="font-medium">{{
                          newMeetingIdentifier
                        }}</span>
                      </div>
                    </td>
                    <td class="py-3 px-6 text-left">
                      <div class="flex items-center">
                        <div class="mr-2"></div>
                        <span>{{ items.meetingItem }}</span>
                      </div>
                    </td>
                    <td class="py-3 px-6 text-left">
                      <div class="flex items-center">
                        <div class="mr-2"></div>
                        <span>{{ items.itemComment }}</span>
                      </div>
                    </td>
                    <td class="py-3 px-6 text-center">
                      <div class="flex items-center justify-center">
                        {{ items.status.description }}
                      </div>
                    </td>
                    <td class="py-3 px-6 text-center">
                      <div class="flex items-center justify-center">
                        {{ items.personResponsible }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currStep == 0" class="flex p-2 mt-4">
        <div class="flex-auto flex flex-row-reverse">
          <button
            @click.prevent="createMeeting"
            class="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition"
          >
            Save
          </button>
        </div>
      </div>
      <div v-if="stepTwo" class="flex p-2 mt-4">
        <div class="flex-auto flex flex-row-reverse">
          <button
            @click.prevent="skipToEnd"
            class="text-base hover:scale-110 ml-2 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition"
          >
            Skip
          </button>
          <button
            @click.prevent="createMeetingItems"
            class="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-600 bg-teal-600 text-teal-100 border duration-200 ease-in-out border-teal-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MeetingService from "@/services/MeetingService";
import MeetingTypeService from "@/services/MeetingTypeService";
import MeetingItemsService from "@/services/MeetingItemsService";
import { namespace } from "vuex-class";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

const Auth = namespace("Auth");

type meetings = {
  id: 0;
  description: "";
};
type responseObject = {
  id: 0;
  name: "";
};

@Component({
  components: {
    Datepicker,
  },
})
export default class CreateMeetingComponent extends Vue {
  private content = "";
  @Auth.State("user")
  private currentUser!: any;
  private stepTwo = "";
  private stepThree = "";
  private currStep = 0;
  private options = [];
  private filteredMeetingItems = [];
  private filteredNewMeetingItems =[];
  private filteredMeeting = [];
  private newMeetingFilter = [];
  private newMeetingId = 0;
  private description = "";
  private newMeetingIdentifier = "";
  private prevMeetingIdentifier = "";
  private meeting: any = { meetingDateAndTime: "", meetingTypeId: "" };
  private meetingItemFields: any ={ meetingItem: "", itemComment: "", StatusId:1, dueDate: "" , personResponsible:""};
  private resp: responseObject = { id: 0, name: "" };
  private unfiltereOptions: meetings = { id: 0, description: "" };
  private checkedItems = [];
  private showModal = false;
  private meetingItem: any = {
    dueDate: "",
    meetingId: "",
    personResponsible: "",
    itemComment: "",
    statusId: "",
    isClosed: false,
  };

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
    this.loadTypes();
    this.loadMeetings();
  }
  loadMeetings() {
    MeetingService.getAllMeetings().then(
      (response) => {
        this.content = response.data;
        if (this.prevMeetingIdentifier) {
          this.filteredMeeting = response.data.filter(
            (x) => x.identifier == this.prevMeetingIdentifier
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.filteredMeetingItems = this.filteredMeeting[0].meetingItems;
        }
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
  loadTypes() {
    MeetingTypeService.getAllMeetingTypes().then(
      (response) => {
        this.options = response.data.map((option) => option.description);
        this.unfiltereOptions = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  createMeeting() {
    if (this.description && this.meeting.meetingDateAndTime) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.meeting.meetingTypeId = this.unfiltereOptions.filter((x) => x.description == this.description)
        .map((ids) => ids.id);

      MeetingService.addMeeting(
        this.meeting.meetingDateAndTime,
        this.meeting.meetingTypeId[0],
        this.description.charAt(0)
      ).then(
        (data) => {
          this.loadTypes();
          this.resp = data.data;
          this.newMeetingIdentifier = this.resp.name;
          this.newMeetingId =this.resp.id;
          if (parseInt(this.newMeetingIdentifier.slice(1)) > 1) {
            const count = parseInt(this.newMeetingIdentifier.slice(1)) - 1;
            this.prevMeetingIdentifier =
              this.newMeetingIdentifier.charAt(0) + count;
            this.loadMeetings();
          }
          this.stepNext();
        },
        (error) => {
          //console.log(error);
        }
      );
    }
  }
  createMeetingItems() {
    if (this.checkedItems) {
      let result = [];
      for (let i = 0; i < this.checkedItems.length; i++) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        result.push(this.filteredMeetingItems.filter((x) => x.id == this.checkedItems[i])
        );
      }
      if (result) {
        for (let i = 0; i < result.length; i++) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.meetingItem.meetingId = this.resp.id;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.meetingItem.personResponsible = result[i][0].personResponsible;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.meetingItem.itemComment = result[i][0].itemComment;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.meetingItem.statusId = result[i][0].statusId;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.meetingItem.dueDate = result[i][0].dueDate;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.meetingItem.meetingItem= result[i][0].meetingItem;

          MeetingItemsService.addMeetingItems(
            this.meetingItem.meetingItem,
            this.meetingItem.dueDate,
            this.meetingItem.personResponsible,
            this.meetingItem.itemComment,
            this.meetingItem.statusId,
            this.meetingItem.meetingId
          ).then(
            (data) => { 
              //
            },
            (error) => {
              //console.log(error)
            }
          );
        }
        this.loadNewItems();
        this.skipToEnd();
      }
    }
  }
  createMeetingItem() {
    if (this.meetingItemFields) {
          this.meetingItemFields.statusId = 1;
          MeetingItemsService.addMeetingItems(
            this.meetingItemFields.meetingItem,
            this.meetingItemFields.dueDate,
            this.meetingItemFields.personResponsible,
            this.meetingItemFields.itemComment,
            this.meetingItemFields.statusId,
            this.newMeetingId
          ).then(
            (data) => {
              this.loadNewItems();
            },
            (error) => {
              //console.log(error)
            }
          );
        }
        this.stepNext();
  }
  loadNewItems() {
    MeetingService.getAllMeetings().then(
      (response) => {
        this.content = response.data;
        if (this.newMeetingId) {
          this.newMeetingFilter = response.data.filter(
            (x) => x.id == this.newMeetingId
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.filteredNewMeetingItems = this.newMeetingFilter[0].meetingItems;
        }
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
  customFormatter(date) {
    return moment(date).format('"MMMM Do YYYY, h:mm:ss a"');
  }
  stepNext() {
    this.currStep += 1;
    if (this.currStep == 1) {
      this.stepTwo = "show";
      return;
    } else if (this.currStep > 2) {
      this.loadNewItems();
      this.stepTwo = "";
      this.stepThree = "show";
      return;
    }
  }
  activate() {
    setTimeout(() => this.stepThree = "false", 500);
  }
  skipToEnd() {
    this.currStep = 2;
    this.stepTwo = "";
    this.stepThree = "show";
    this.loadNewItems();
  }
}
</script>
