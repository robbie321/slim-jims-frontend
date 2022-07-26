<template>
  <v-app class="container">
    <v-app-bar app color="black" dark>
      <div class="logo">
        <h1 style="color: #cd9bf0">SLIM JIMMY'S</h1>
      </div>
      <v-spacer></v-spacer>

      <div class="menu-links">
        <div id="user">
          <v-btn v-show="this.$store.state.userRole == 'user' && this.$store.state.signedIn == true"
            ><span class="mr-2">Profile</span>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </div>
        <div id="admin">
          <v-btn v-show="this.$store.state.userRole == 'admin'" href="/addItem" text>
            <span class="mr-2">Add Item</span>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>

      <div class="auth-links">
        <div id="signedIn">
          <v-btn v-show="signedIn" href="/signIn" @click="logout()" text>
            <span class="mr-2">Logout</span>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </div>
        <div id="signedOut">
          <v-btn v-show="!signedIn" href="/signIn" text>
            <span class="mr-2">Sign In</span>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    },
    logout() {
      this.$store.dispatch("logout");
    },
    menuItems() {
      let menuItems = [
        { icon: "lock", title: "Home", link: "/" },
        { icon: "lock", title: "About", link: "/about" },
        { icon: "lock", title: "Shop", link: "/marketplace" },
        { icon: "lock", title: "Blog", link: "/blog" },
        { icon: "lock", title: "login", link: "/signin" },
      ];

      if (this.signedIn && this.userRole == "user") {
        menuItems = [
          { icon: "home", title: "Home", link: "/" },
          { icon: "donate", title: "Donate", link: "/donate" },
          { icon: "chevron-up", title: "Upcycle", link: "/upcycle-choice" },
          { icon: "store", title: "Shop", link: "/marketplace" },
          { icon: "lock", title: "About", link: "/about" },
          { icon: "lock", title: "Blog", link: "/blog" },
          { icon: "address-card", title: "Profile", link: "/profile" },
        ];
      }

      if (this.signedIn && this.userRole == "admin") {
        menuItems = [
          { icon: "home", title: "Home", link: "/" },
          { icon: "donate", title: "Donate", link: "/donate" },
          { icon: "chevron-up", title: "Upcycle", link: "/upcycle-choice" },
          { icon: "store", title: "Shop", link: "/marketplace" },
          // { icon: "user-tie", title: "Profile", link: "/profile" },
          { icon: "address-card", title: "Admin Portal", link: "/AdminPortal" },
        ];
      }

      return menuItems;
    },
  },
});
</script>
<style>
.v-main__wrap {
  background-color: #e8e8e6;
  color: 000;
}
</style>
