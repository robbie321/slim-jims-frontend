<template>
  <v-app class="container">
    <div class="nav-container hidden-on-xs">
      <div class="inline">
        <img src="../src/assets/logo.png" width="15%" alt="" />

        <div class="inline vertically-align" style="float: right">
          <div style="float: right" v-if="signedIn">
            <v-btn class="mx-2 nav-buttons" dark color="#cd9bf0" @click="logout()">Logout</v-btn>
          </div>
          <div style="float: right" v-if="!signedIn">
            <v-btn class="mx-2 nav-buttons" dark color="#cd9bf0" to="/signIn">Login</v-btn>
          </div>
          <v-btn
            class="mx-2 nav-buttons"
            text
            v-for="item in menuItems"
            :key="item.id"
            router
            :to="item.link"
            dark
          >
            {{ item.title }}
          </v-btn>
        </div>
      </div>
    </div>

    <v-bottom-navigation class="hidden-on-xl" fixed>
      <v-btn text v-for="item in bottomMenuItems" dark :key="item.id" router :to="item.link">
        <span>
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </span>
      </v-btn>
    </v-bottom-navigation>

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

    menuItems() {
      let menuItems = [
        // { icon: "lock", title: "login", link: "/signIn" },
        { icon: "lock", title: "Shop", link: "/" },
      ];

      if (this.signedIn && this.userRole == "user") {
        menuItems = [
          { icon: "home", title: "Shop", link: "/" },
          { icon: "face-man-profile", title: "Profile", link: "/profile" },
        ];
      }

      if (this.signedIn && this.userRole == "admin") {
        menuItems = [
          { icon: "home", title: "Home", link: "/" },
          { icon: "donate", title: "Add Item", link: "/addItem" },
        ];
      }

      return menuItems;
    },
    bottomMenuItems() {
      let bottomMenuItems = [
        { icon: "lock", title: "login", link: "/signIn" },
        { icon: "lock", title: "Shop", link: "/" },
      ];

      if (this.signedIn && this.userRole == "user") {
        bottomMenuItems = [
          { icon: "home", title: "Shop", link: "/" },
          { icon: "cart", title: "Cart", link: "/cart" },
          { icon: "face-man-profile", title: "Profile", link: "/profile" },
          { icon: "logout", title: "logout", link: "/logout" },
        ];
      }

      if (this.signedIn && this.userRole == "admin") {
        bottomMenuItems = [
          { icon: "home", title: "Home", link: "/" },
          { icon: "donate", title: "Add Item", link: "/addItem" },
          { icon: "cart", title: "Cart", link: "/cart" },
          { icon: "logout", title: "logout", link: "/logout" },
        ];
      }

      return bottomMenuItems;
    },
    userRole() {
      return this.$store.state.userRole;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
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

.hide-on-lg {
  visibility: show;
  font-family: "Comfortaa", cursive;
}

.hidden-on-xl {
  visibility: hidden;
}

.hide-banner-xl {
  display: none;
}

.hidden-on-xs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  visibility: show;
}

@media screen and (max-width: 820px) {
  .hidden-on-xl {
    visibility: visible;
  }

  .hide-banner-xl {
    visibility: show;
    display: initial;
  }

  .hidden-on-xs {
    display: none;
    visibility: hidden;
  }
}

.inline {
  display: inline-block;
}
.nav-container {
  padding: 20px 50px 20px 50px;
  background-color: #000;
  text-decoration: none;
  /* padding: 10px; */
}
.nav-buttons {
  float: right;
  height: 45px !important;
}

.icon {
  color: #000;
}
</style>
