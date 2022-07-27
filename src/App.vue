<template>
  <v-app class="container">
    <v-app-bar app color="black" dark>
      <div class="logo">
        <h1 class="heading">SLIM JIMMY'S</h1>
      </div>
      <v-spacer></v-spacer>

      <div id="shop">
        <v-btn href="/" text
          ><span class="mr-2">Shop</span>
          <v-icon>mdi-shopping</v-icon>
        </v-btn>
      </div>

      <div class="menu-links">
        <div id="user">
          <v-btn
            text
            v-show="this.$store.state.userRole == 'user' && this.$store.state.signedIn == true"
            href="/profile"
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
  color: #000;
}

input[type="text"],
input[type="password"],
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-color: black;
  box-sizing: border-box;
  background-color: white;
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
}

.heading {
  color: #cd9bf0;
  font-size: 1em;
}
</style>
