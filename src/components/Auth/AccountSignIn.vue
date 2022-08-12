<template>
  <div class="">
    <div>
      <v-alert v-show="error" dismissible prominent shaped type="error" style="margin-top: 20px">{{
        error
      }}</v-alert>
    </div>
    <div class="container">
      <p class="text-heading">LOG IN</p>
      <hr />
      <!-- <label for="uname"><b>Username</b></label> -->
      <input type="text" placeholder="Enter email" v-model="email" name="uname" required />

      <!-- <label for="psw"><b>Password</b></label> -->
      <input type="password" placeholder="Enter Password" v-model="password" name="psw" required />

      <button type="submit" @click="signIn">LOGIN</button>
    </div>

    <p class="text">Dont have an account?</p>

    <div class="container" style="background-color: #f1f1f1">
      <button type="button" class="signup" @click="$router.push('/createAccount')">Sign Up</button>
      <span class="psw">Forgot <a href="#">password?</a></span>
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
    };
  },

  computed: {
    error() {
      return (this.err = this.$store.getters.error);
    },
  },

  methods: {
    signIn() {
      console.log("pressed");
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
hr {
  margin-bottom: 15px;
}

.admin {
  text-decoration: underline;
}

.text {
  text-align: center;
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
}

.text-heading {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

button {
  background-color: #000000;
  color: #cd9bf0;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
}

button:hover {
  opacity: 0.8;
}

.signup {
  width: auto;
  padding: 10px 18px;
  background-color: #000000;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .signup {
    width: 100%;
  }
}
</style>
