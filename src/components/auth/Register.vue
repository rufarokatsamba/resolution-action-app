<template>
   <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
        <div class="max-w-md mx-auto my-10">
            <div class="text-center">
                <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign up</h1>
                <p class="text-gray-500 dark:text-gray-400">Sign up to create your account</p>
            </div>
            <div class="m-7">
              <form name="form" @submit.prevent="handleRegister">
                <div class="mb-6">
                        <label for="firstName" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">FirstName</label>
                        <input v-model="user.firstName" v-validate="'required|min:3|max:20'" type="firstName" name="firstName" id="firstName" placeholder="name" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                    </div>
                    <div class="mb-6">
                        <label for="lastName" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">LastName</label>
                        <input v-model="user.lastName" v-validate="'required|min:3|max:20'" type="text" name="text" id="lastname" placeholder="lastname" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                    </div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email</label>
                        <input v-model="user.email" type="email" name="email" id="email" placeholder="you@chillisoft.com" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                         <div
                          v-if="errors.has('email')"
                          class="alert alert-danger"
                          role="alert"
                        >
                          email is required!
                        </div>
                    </div>
                    <div class="mb-6">
                        <div class="flex justify-between mb-2">
                            <label for="password" class="text-sm text-gray-600 dark:text-gray-400">Password</label>
                            <a href="#!" class="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
                        </div>
                        <input v-model="user.password" v-validate="'required|min:6|max:40'" type="password" name="password" id="email" placeholder="password" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                          <div
                            v-if="errors.has('password')"
                            class="alert alert-danger"
                            role="alert"
                          >
                            Password is required!
                          </div>
                        </div>
                        <div v-if="!showMessage && message" @click.prevent="close" class="bg-red-100 rounded-lg py-4 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                          <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                          </svg>
                          {{ message }}
                        </div>  
                        <div class="mb-6">
                            <button type="button" 
                             @click="handleRegister"
                            class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign up</button>
                        </div>
                        <div class="form-group">
                      </div>
                    <p class="text-sm text-center text-gray-400">Have&#x27; an account already? <a href @click.prevent="logIn" class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Login</a>.</p>
                </form>
            </div>
        </div>
    </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  const Auth = namespace("Auth");
  
  @Component
  export default class Register extends Vue {
    private user: any = { firstName: "", lastName: "", email: "", password: ""};
  
    private submitted  = false;
    private successful = false;
    private message    = "";
    private showMessage = false;
  
    @Auth.Getter
    private isLoggedIn!: boolean;
  
    @Auth.Action
    private register!: (data: any) => Promise<any>;
    private signOut!: () => void;


    mounted() {
      if (this.isLoggedIn) {
        this.$router.push("/profile");
      }
    }
    close(){
      this.showMessage = true;
    }
    handleRegister() {
      this.message = "";
      this.submitted = true;
  
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.register(this.user).then(
            (data) => {
              this.$router.push("/login");
            },
            (error) => {
              if(error.includes("400")){
                this.message = "Invalid credentials";
              }
              else{
                this.message = error;
                this.showMessage = true;
              }
            }
          );
        }
      });
    }
    logIn() {
      this.$router.push("/login");
    }
  }
  </script>
  
  <style scoped>
  </style>