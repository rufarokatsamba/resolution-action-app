<template>
    <div class="flex">
    <div class="flex w-2/5 md:w-1/4 h-screen bg-white">
      <div class="mx-auto py-10">
        <h1 class="text-2xl font-bold mb-10 cursor-pointer text-[#EC5252] duration-150" @click.prevent>ChilliSoft</h1>
          <ul>
            <li class="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">         
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <router-link to="/home" class="nav-link">
                <span class="font-semibold">Home</span>
              </router-link>
            </li>
            <li class="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z"/></svg>
              <router-link to="/meetings" class="nav-link"> <span class="font-semibold">Meetings</span> </router-link>
            </li>
            <li class="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
              <router-link to="/mod" class="nav-link"><span class="font-semibold">Reports</span></router-link>
            </li>
            <li class="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
              <router-link  to="/user" class="nav-link"
              > <font-awesome-icon icon="user-plus" /><span class="font-semibold">User</span></router-link
            >
            </li>
            <li v-if="showAdminBoard" class="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
              <router-link to="/admin" class="nav-link">Admin Board</router-link>
            </li>
            <li v-if="showModeratorBoard" class="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
              <router-link to="/mod" class="nav-link">Moderator Board</router-link>
            </li>
          </ul>      
    </div>
    </div>
    <main class=" min-h-screen w-full">
        <nav class="flex justify-between px-6 bg-white py-6">
        <div class="flex items-center  px-4 py-2 rounded-md space-x-3 w-80">
        </div>
        <div  class="flex mr-4">
          <div v-if="!loggedIn" class="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150 px-3"> <router-link to="/register" class="nav-link">
             Sign Up
            </router-link></div>
          <div v-if="!loggedIn" class="flex space-x-2 mt-10  cursor-pointer hover:text-[#EC5252] duration-150"><router-link to="/login" class="nav-link">
              Login
            </router-link></div>
            <div v-if="loggedIn" class="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150 pr-2 border-solid">
                <router-link to="/profile" class="nav-link">
            <span class="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ currentUser.userName }}</span>

              </router-link>
            </div>
            <div v-if="loggedIn" class="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150 pr-2 border-solid">
              <a class="nav-link" href @click.prevent="logOut">
                <span class="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">LogOut</span>
            </a>
            </div>
        </div>
      </nav>
      <div class="w-full ">
        <router-view />
      </div>
    </main>
  </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import UserService from "@/services/UserService";
  import { namespace } from "vuex-class";
  const Auth = namespace("Auth");
  
  @Component
  export default class Home extends Vue {
    private content = "";
    @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  get showAdminBoard(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return this.currentUser.roles.includes("ROLE_ADMIN");
    }

    return false;
  }
  get loggedIn(): boolean {
    console.log(this.currentUser)
    if (this.currentUser != null) {
      return true;
    }
    else{
      this.signOut();
     this.$router.push("/login");
    }

    return false;
  }
  

  get showModeratorBoard(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return this.currentUser.roles.includes("ROLE_MODERATOR");
    }

    return false;
  }

  logOut() {
    this.signOut();
    this.$router.push("/login");
  }
    mounted() {
      UserService.getPublicContent().then(
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