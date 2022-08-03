<template>
  <div>
    <div class="container">
      <h1 style="text-align: center">CREATE ACCOUNT</h1>

      <hr />
      <div class="input">
        <div class="">
          <h2 class="small">Personal Info</h2>
        </div>

        <input class="input" placeholder="Full name" v-model="name" type="text" />

        <input class="input" type="text" v-model="email" placeholder="Email" />
        <span class="help is-danger" v-if="emailErrorCheck">{{ emailErrorCheck }}</span>

        <div class="">
          <h2 class="small">Security</h2>
        </div>
        <input class="input" placeholder="Password" v-model="password" type="password" />
        <span class="help is-danger" v-if="passwordErrorCheck">{{ passwordErrorCheck }}</span>

        <input
          class="input"
          type="password"
          placeholder="Confirm Password"
          v-model="confirmPassword"
        />
        <span class="help is-danger" v-if="confirmPasswordErrorCheck">{{
          confirmPasswordErrorCheck
        }}</span>
        <span class="is-danger" v-if="password != confirmPassword && confirmPassword != null"
          >Passwords do not match</span
        >
        <span class="success" v-if="password == confirmPassword && confirmPassword != null"
          >Passwords matching</span
        >

        <div class="">
          <h2 class="small">Shipping Info</h2>
        </div>
        <input class="input" type="text" v-model="addressOne" placeholder="Address line one" />
        <span class="help is-danger" v-if="addressError">{{ addressError }}</span>

        <input class="input" type="text" placeholder="Address line two" v-model="addressTwo" />
        <span class="help is-danger" v-if="addressError2">{{ addressError2 }}</span>

        <input class="input" type="text" v-model="county" placeholder="County" />
        <span class="help is-danger" v-if="countyError">{{ countyError }}</span>

        <input class="input" type="text" placeholder="Eircode" v-model="eircode" />

        <span class="help is-danger" v-if="eircodeError">{{ eircodeError }}</span>

        <input class="input" type="text" v-model="mobile" placeholder="Mobile number" />
        <span class="help is-danger" v-if="mobileErrorCheck">{{ mobileErrorCheck }}</span>

        <div class="signin">
          <v-btn
            color="black"
            style="float: right; margin-bottom: 20px; color: #cd9bf0"
            @click="validate()"
            >Create account & sign in</v-btn
          >
        </div>

        <div>
          <h6>
            Already a member? <a href="/signIn"><span style="color: #009c75"> Log in</span></a>
          </h6>
        </div>
      </div>
      <div class="reset"></div>
      <div></div>
    </div>

    <div style="margin-bottom: 15%"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    confirmPassword: null,
    addressOne: "",
    addressTwo: "",
    county: "",
    county2: [
      "Antrim",
      "Armagh",
      "Carlow",
      "Cavan",
      "Clare",
      "Cork",
      "Derry",
      "Donegal",
      "Down",
      "Dublin",
      "Fermanagh",
      "Galway",
      "Kerry",
      "Kildare",
      "Kilkenny",
      "Laois",
      "Leitrim",
      "Limerick",
      "LondonDerry",
      "Longford",
      "Louth",
      "Mayo",
      "Meath",
      "Monoghan",
      "Offaly",
      "Roscommon",
      "Sligo",
      "Tipperary",
      "Tyrone",
      "Waterford",
      "Westmeath",
      "Wexford",
      "Wicklow",
    ],
    eircode: "",
    mobile: "",
    rules: {
      email: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: [
        (v) => !!v || "Please enter a password",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters long",
      ],
      confirmPassword: [
        (v) => !!v || "Please confrim your password",
        (v) => v === this.password || "Passwords do not match",
      ],
    },

    emailErrorCheck: null,
    passwordErrorCheck: null,
    confirmPasswordErrorCheck: null,
    addressError: null,
    addressError2: null,
    countyError: null,
    eircodeError: null,
    mobileErrorCheck: null,
    nameErrorCheck: null,
  }),

  methods: {
    validate() {
      this.clearCardErrors();
      let valid = true;
      if (!this.email) {
        valid = false;
        this.emailErrorCheck = "Please provide an email address";
      }

      // billing info
      if (!this.addressOne) {
        valid = false;
        this.addressError = "Address line 1 cannot be empty";
      }
      if (!this.name) {
        valid = false;
        this.nameErrorCheck = "Name cannot be empty";
      }
      if (!this.addressTwo) {
        valid = false;
        this.addressError2 = "Address line 2 cannot be empty";
      }
      if (!this.county) {
        valid = false;
        this.countyError = "County cannot be empty";
      }
      if (!this.eircode) {
        valid = false;
        this.eircodeError = "Eircode cannot be empty";
      }
      if (!this.mobile) {
        valid = false;
        this.mobileErrorCheck = "Mobile cannot be empty";
      }
      if (valid) {
        this.create();
      }
    },
    clearCardErrors() {
      (this.emailErrorCheck = null),
        (this.passwordErrorCheck = null),
        (this.confirmPasswordErrorCheck = null),
        (this.addressError = null),
        (this.addressError2 = null),
        (this.countyError = null),
        (this.eircodeError = null),
        (this.mobileErrorCheck = null);
      this.nameErrorCheck = null;
    },
    create() {
      const user = {
        name: this.name,
        email: this.email,
        phoneNumber: this.mobile,
        firstAddress: this.addressOne,
        secondAddress: this.addressTwo,
        county: this.county,
        eircode: this.eircode,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      this.$store.dispatch("registerUser", user);
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
  padding: 80px 250px 80px 250px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and signup button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .signup {
    width: 100%;
  }
}

@media screen and (max-width: 800px) {
  .container {
    padding: 10px 50px 10px 50px;
  }
}

div[aria-required="true"].v-text-field .v-label::after {
  content: " *";
  color: red;
}
</style>
