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
                :placeholder="profile.name"
                :value="profile.name"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label class="labels">Mobile Number</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.phoneNumber"
                :value="profile.phoneNumber"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Address Line 1</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.firstAddress"
                :value="profile.firstAddress"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Address Line 2</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.secondAddress"
                :value="profile.secondAddress"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Eircode</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.eircode"
                :value="profile.eircode"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">County</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.county"
                :value="profile.county"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Email</label
              ><input
                type="text"
                class="form-control"
                :placeholder="profile.email"
                :value="profile.phoneNumber"
              />
            </div>
          </div>
          <div class="mt-5 text-center">
            <v-btn color="black" dark class="save-btn" type="button">Save Profile</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object,
  },
  data: () => ({}),
  computed: {
    User() {},
  },
};
</script>

<style scoped>
.save-btn {
  color: #cd9bf0;
  font-weight: bold;
}
</style>
