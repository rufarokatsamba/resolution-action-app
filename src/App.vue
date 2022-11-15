<template>
  <div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class App extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  get loggedIn(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return this.currentUser.roles.includes("ROLE_ADMIN");
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
}
</script>

<style lang="scss">
</style>
