<template>
  <div>
    <div style="margin-bottom: 5%"></div>

    <div class="container">
      <div class="input">
        <h1 style="text-align: center">Create account</h1>

        <div class="">
          <h2 class="small">Personal Info</h2>
        </div>

        <input class="input" placeholder="Full name" v-model="name" type="text" />
        <!-- <v-text-field dense v-model="name" label="Full Name"></v-text-field> -->

        <input class="input" type="text" v-model="email" placeholder="Email" />
        <!-- <v-text-field
            v-model="email"
            class="text-field"
            label="Email"
            dense
            outlined
            required
          ></v-text-field> -->
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

        <!-- <input class="input" type="text" v-model="county" placeholder="County" /> -->
        <select
          name="county"
          id="county"
          placeholder="County"
          class="selector"
          dense
          :items="county"
          v-model="county"
          outlined
        ></select>

        <v-select :items="county" outlined></v-select>
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
    county: [
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
.small {
  font-size: 2.5rem;
}
.container {
  justify-content: center;
  align-items: center;
  width: 80%;
}
/* .card {
  margin: 0 auto;
  display: flex;
  justify-content: center;
} */

/* @media screen and (min-width: 850px) {
  .card {
    width: 65vw;
  }
}

@media screen and (min-width: 1220px) {
  .card {
    width: 50vw;
  }
} */
/* .signin {
  width: 100%;
} */

.input[type="text"],
.input[type="password"] {
  width: 49%;
  padding: 12px 20px;
  margin: 2px;
  box-sizing: border-box;
  outline-color: black;
  border: 1px solid black;
  border-radius: 4px;
  background-color: white;
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
}

div[aria-required="true"].v-text-field .v-label::after {
  content: " *";
  color: red;
}
</style>
