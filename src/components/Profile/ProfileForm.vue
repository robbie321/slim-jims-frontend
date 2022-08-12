<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-md-5 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Profile Settings</h4>
          </div>
          <div class="row mt-2">
            <div class="col-md-6">
              <label class="labels">Name</label
              ><input
                type="text"
                class="form-control"
                v-model="payload.named"
                :placeholder="profile.name"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label class="labels">Mobile Number</label
              ><input
                type="number"
                class="form-control"
                :placeholder="profile.phoneNumber"
                v-model="payload.mobile"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Address Line 1</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.firstAddress"
                v-model="payload.addressLineOne"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Address Line 2</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.secondAddress"
                v-model="payload.addressLineTwo"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Eircode</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.eircode"
                v-model="payload.eircode"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">County</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.county"
                v-model="payload.county"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Email</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.email"
                :value="profile.email"
                disabled
              />
            </div>
          </div>
          <div class="mt-5 text-center">
            <v-btn color="black" dark class="save-btn" type="button" @click="updateProfile()"
              >Save Profile</v-btn
            >
          </div>
        </div>

        <v-alert v-show="savedProfile" dismissible prominent shaped type="success"
          >Your profile has now been updated</v-alert
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      payload: {
        named: "",
        mobile: "",
        addressLineOne: "",
        addressLineTwo: "",
        eircode: "",
        county: "",
      },
      savedProfile: false,
    };
  },

  computed: {
    profile() {
      return this.$store.getters.loadProfile;
    },
  },

  methods: {
    updateProfile() {
      this.checkInput();
      this.$store.dispatch("updateProfile", this.payload);
      this.savedProfile = true;
    },

    checkInput() {
      // if the value is empty, replace it with the current profile value
      if (this.payload.named == "") this.payload.named = this.profile.name;
      if (this.payload.mobile == "") this.payload.mobile = this.profile.phoneNumber;
      if (this.payload.addressLineOne == "")
        this.payload.addressLineOne = this.profile.firstAddress;
      if (this.payload.addressLineTwo == "")
        this.payload.addressLineTwo = this.profile.secondAddress;
      if (this.payload.county == "") this.payload.county = this.profile.county;
      if (this.payload.eircode == "") this.payload.eircode = this.profile.eircode;
    },
  },
};
</script>

<style scoped>
.save-btn {
  color: #cd9bf0;
  font-weight: bold;
}
</style>
