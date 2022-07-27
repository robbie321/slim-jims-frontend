<template>
  <div>
    <div
      class="container center"
      v-if="this.$store.state.userRole == 'user' && this.$store.state.signedIn == true"
    >
      <div id="name">
        <h1>{{ Profile.name }}</h1>
      </div>

      <div id="profile">
        <Profile v-bind:profile="Profile" />
      </div>
      <hr />
      <h1>Orders</h1>
      <div id="orders">
        <Orders v-bind:orders="Orders" />
      </div>
    </div>
    <div
      class="container center"
      v-else-if="this.$store.state.userRole == 'admin' && this.$store.state.signedIn == true"
    >
      <div>
        <h1>{{ Profile.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  beforeCreate() {
    this.$store.dispatch("loadProfile");
    this.$store.dispatch("loadUserOrders");
  },
  computed: {
    Profile() {
      return this.$store.getters.loadProfile;
    },
    Orders() {
      return this.$store.getters.loadOrders;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.center {
  margin: auto;
  width: 80%;
  padding: 10px;
}
</style>
