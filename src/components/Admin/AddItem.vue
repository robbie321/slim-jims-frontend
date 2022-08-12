<template>
  <div class="wrapper">
    <h1 style="text-align: center">Add a new item</h1>

    <section class="" style="text-align: left; padding: 0 2% 0 2%">
      <div class="inputSelect">
        <v-form ref="form" lazy-validation>
          <div class="item-info">
            <div class="border">
              <h2>Item specifics</h2>

              <p>Buyers need these details to find your item</p>

              <input placeholder="Item name" type="text" v-model="name" dense outlined required />
              <span class="help" v-if="nameErrorCheck">{{ nameErrorCheck }}</span>

              <input placeholder="price" type="number" v-model="price" dense outlined required />
              <span class="help" v-if="priceErrorCheck">{{ priceErrorCheck }}</span>

              <input
                placeholder="Stock availability"
                type="number"
                v-model="stockQuantity"
                dense
                outlined
                required
              />
              <span class="help" v-if="stockErrorCheck">{{ stockErrorCheck }}</span>
            </div>
          </div>

          <div class="image-file">
            <div class="border">
              <h2>Upload images</h2>
              <p>You can select multiple photos to upload</p>

              <div class="file">
                <label class="custom-file-upload">
                  <div style="padding-top: 80px">
                    <p class="">Drag and drop files here</p>
                    <p>or</p>
                    <p>Click to add from device</p>
                  </div>
                  <input
                    class="file"
                    id="file"
                    :rules="rules.image"
                    @change="uploadFile"
                    type="file"
                    multiple
                  />
                </label>
              </div>
            </div>
          </div>

          <div class="end">
            <v-btn @click.prevent="validate" dark>Add new item</v-btn>
          </div>
        </v-form>
        <br />
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data: () => ({
    form: new FormData(),
    images: [],
    name: "",
    price: "",
    itemType: "",
    stockQuantity: "",
    description: "",
    rules: {
      name: [
        (v) => v.length <= 30 || "Max length is 30 characters",
        (v) => !!v || "This field cannot be left blank",
      ],
      image: [(v) => !!v || "This field cannot be left blank"],
    },

    nameErrorCheck: null,
    priceErrorCheck: null,
    stockErrorCheck: null,
  }),
  beforeCreate() {
    // return this.$store.dispatch("session");
  },
  computed: {
    submitFile() {
      //   let currentImage = this.images;
      //   if (currentImage.length == 0) return alert("Image cannot be empty");
      //   else {
      //     for (const file of currentImage) {
      //       this.form.append("file", file);
      //     }
      //   }

      console.log(this.name, this.price, this.stockQuantity);

      this.form.append("name", this.name);
      this.form.append("price", this.price);
      this.form.append("stockQuantity", this.stockQuantity);

      console.log(this.form);

      //   this.$store.dispatch("addProduct", this.form);
    },
  },
  methods: {
    validate() {
      this.clearCardErrors();
      let valid = true;

      if (!this.price) {
        valid = false;
        this.priceErrorCheck = "price cannot be empty";
      }

      // billing info
      if (!this.stockQuantity) {
        valid = false;
        this.stockErrorCheck = "Stock cannot be empty";
      }
      if (!this.name) {
        valid = false;
        this.nameErrorCheck = "Name cannot be empty";
      }

      if (valid) {
        this.post();
      }
    },
    clearCardErrors() {
      this.nameErrorCheck = null;
      this.priceErrorCheck = null;
      this.stockErrorCheck = null;
    },
    uploadFile(e) {
      console.log(e.target.files);
      this.images = e.target.files;
    },

    post() {
      this.$store.dispatch("addProduct", {
        name: this.name,
        price: this.price,
        stockQuantity: this.stockQuantity,
      });

      //   if (this.$refs.form.validate()) {
      //     this.submitFile();
      //     console.log("Success");
      //   } else {
      //     alert("Please enter the correct details and try again");
      //     console.log("Denied");
      //   }
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.border {
  padding: 3%;
  border: 1px;
  border-style: solid;
  margin-bottom: 1rem;
}

.v-btn {
  width: 100%;
  height: 48px !important;
}
.custom-file-upload {
  text-align: center;
  vertical-align: middle;
  background-color: #ffffff;
  border: 1px solid rgb(0, 0, 0);
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  width: 100%;
  height: 300px;
}
input[type="file"] {
  display: none;
  font-size: 25px;
}

.help {
  color: red;
}
</style>
