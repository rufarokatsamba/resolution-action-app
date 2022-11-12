<template>
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
        <div class="max-w-md mx-auto my-10">
            <div class="text-center">
                <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in</h1>
                <p class="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
            </div>
            <div class="m-7">
              <form name="form" @submit.prevent="handleLogin">
                    <div class="mb-6">
                        <label for="username" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Username</label>
                        <input v-model="user.username" type="email" name="email" id="email" placeholder="you@chillisoft.com" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                         <div
                          v-if="errors.has('username')"
                          class="alert alert-danger"
                          role="alert"
                        >
                          Username is required!
                        </div>
                    </div>
                    <div class="mb-6">
                        <div class="flex justify-between mb-2">
                            <label for="password" class="text-sm text-gray-600 dark:text-gray-400">Password</label>
                            <a href="#!" class="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
                        </div>
                        <input v-model="user.password" type="password" name="password" id="email" placeholder="password" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                          <div
                            v-if="errors.has('password')"
                            class="alert alert-danger"
                            role="alert"
                          >
                            Password is required!
                          </div>
                        </div>
                        <div class="mb-6">
                            <button type="button" 
                             @click="handleLogin"
                            class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign in</button>
                        </div>
                        <div class="form-group">
                        <div v-if="message" class="alert alert-danger" role="alert">
                          {{ message }}
                        </div>
                      </div>
                    <p class="text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="#!" class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Sign up</a>.</p>
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
  
  import FormInput from "@/components/controls/FormInput.vue";

  @Component({
    components: {
      FormInput,
    },
  })
  export default class Login extends Vue {
    user = { username: "", password: "" };
    private loading = false;
    private message = "";
  
    @Auth.Getter
    private isLoggedIn!: boolean;
  
    @Auth.Action
    private login!: (data: any) => Promise<any>;
  
    created() {
      if (this.isLoggedIn) {
        this.$router.push("/home");
      }
    }
  
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.user.username && this.user.password) {
          this.login(this.user).then(
            (data) => {
              if(data.message != null){
                console.log(data.message)
                Vue.swal(data.message);
                console.log(this.message)
              }
              else{
                this.$router.push("/home");
              }
            },
            (error) => {
              this.loading = false;
              this.message = error;
            }
          );
        }
      });
    }
  }
  </script>
  
  <style scoped>
  </style>