<template>
  <div class="overflow-x-auto">
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
                        <h3 class="text-3xl font-semibold">Edit Item</h3>
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
                          <div class="form-group mb-6 px-3"><p class="mb-1 font-bold">Item</p>
                            <input
                              v-model="meetingItemFields.meetingItem"
                              type="text"
                              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="meetingtypename"
                              placeholder="meeting item"
                            />
                          </div>
                          <div class="form-group mb-6"><p class="mb-1 font-bold">Due Date</p>
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
                          <p class="mb-1 font-bold">Responsible Person</p>

                            <input
                              v-model="meetingItemFields.personResponsible"
                              type="text"
                              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="meetingtypename"
                              placeholder="responsible person"
                            />
                          </div>
                          <div class="form-group mb-6 px-3">
                          <p class="mb-1 font-bold">Status</p>
                          <multiselect
                            v-if="options"
                            v-model="description"
                            :options="options"
                            :multiple="false"
                            class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                          ></multiselect>
                          </div>
                        </div>
                        
                        
                          <div class="-mx-3 md:flex-inline mb-6 px-3">
                          <div class="form-group mb-6">
                            <p class="mb-1 font-bold">Comment</p>
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
    <div class="min-w-screen flex font-sans rounded">
      <div class="w-full">
        <div class="rounded mt-6 h-60 overflow-y-auto scrollbar">
          <table class="min-w-max w-full table-auto">
            <thead>
              <tr
                class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal"
              >
                <th class="py-3 px-6 text-left">id</th>
                <th class="py-3 px-6 text-left">Item</th>
                <th class="py-3 px-6 text-center">Comment</th>
                <th class="py-3 px-6 text-center">Responsible Person</th>
                <th class="py-3 px-6 text-center">Status</th>
                <th class="py-3 px-6 text-center">Due Date</th>
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody v-for="meetingItem in meetingItemsProp[0]" :key="meetingItem.id" class="text-gray-600 text-sm font-light">
              <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2">
                    </div>
                    <span class="font-medium">{{meetingItem.id}}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <div class="mr-2">
                      
                    </div>
                    <span>{{meetingItem.meetingItem}}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex items-center justify-center">
                    {{meetingItem.itemComment}}
                  </div>
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex items-center justify-center">
                    {{meetingItem.personResponsible}}
                  </div>
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex items-center justify-center">
                    {{meetingItem.status.description}}
                  </div>
                </td>
                <td class="py-3 px-6 text-center">
                  <span
                    >{{meetingItem.dueDate}}</span
                  >
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <div
                     @click="toggleModalWithData(meetingItem)"
                      class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Datepicker from "vuejs-datepicker";
import ItemStatusService from "@/services/ItemStatusService";
import MeetingItemsService from "@/services/MeetingItemsService";
const Auth = namespace("Auth");
type meetingItem = { meetingItem: "", itemComment: "", StatusId:1, dueDate: "" , personResponsible:"", meetingId:"" ,id:"", IsClosed: false};
type status = {
  id: "";
  description: "";
};
@Component({
  components: {
    Datepicker,
  },
})
export default class MeetingItemsComponentTable extends Vue {
  @Prop({ type: Array }) readonly meetingItemsProp!: [];
  private content = "";
  @Auth.State("user")
  private currentUser!: any;
  private meetingItemFields: any ={ meetingItem: "", itemComment: "", StatusId:1, dueDate: "" , personResponsible:"", meetingId:"" ,id:"",};
  private meetingItemFieldsData: meetingItem[]=[];
  private showModal = false;
  private options = [];

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
  mounted() {
    this.$emit("loaded", false);
    this.loadTypes();
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  toggleModalWithData(meetingItem){
    this.meetingItemFields.meetingItem = meetingItem.meetingItem;
    this.meetingItemFields.itemComment = meetingItem.itemComment;
    this.meetingItemFields.dueDate = meetingItem.dueDate;
    this.meetingItemFields.id = meetingItem.id
    this.meetingItemFields.personResponsible = meetingItem.personResponsible;
    this.showModal = !this.showModal;

  }
  loadTypes() {
    ItemStatusService.getItemStatus().then(
      (response) => {
        this.options = response.data.map((option) => option.description);
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
  createMeetingItem() {
    if (this.meetingItemFields) {  
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.meetingItemFieldsData.push({StatusId:1,id:this.meetingItemFields.id, meetingItem:this.meetingItemFields.meetingItem, personResponsible:this.meetingItemFields.personResponsible,itemComment: this.meetingItemFields.itemComment,dueDate: this.meetingItemFields.dueDate, IsClosed: false});
          MeetingItemsService.updateMeetingItems(
          this.meetingItemFields
          ).then(
            (data) => {
              //this.loadNewItems();
            },
            (error) => {
              //console.log(error)
            }
          );
        }
        //this.stepNext();
  }
  logOut() {
    this.signOut();
    this.$router.push("/login");
  }
}
</script>
