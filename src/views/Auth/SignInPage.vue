<template>
  <div class="wrapper">
    <div v-if="!signedIn" class="auth signin">
      <!-- SIGN IN & REGISTER HERE -->
      <AccountSignIn />
    </div>
    <div v-if="signedIn" class="center">
      <button type="submit" @click="signIn()">Marketplace</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      show: false,
      load: false,
      home: "/",
      login: false,
      SignUp: true,
      params: {
        client_id: "vf",
      },
    };
  },

  //   beforeCreate() {
  //     sessionStorage.removeItem("vuex");
  //     localStorage.removeItem("session");
  //   },

  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    },
  },

  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },

    routeTo(id) {
      this.$router.push(id);
    },

    OnSignIn() {
      this.showLoader();
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
      console.log("hello");
    },
  },
};
</script>
<style scoped>
.auth {
  display: flex;
  justify-content: center;
}

.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}
</style>
