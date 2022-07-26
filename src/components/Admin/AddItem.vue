<template>
  <div class="wrapper">
    <h1 style="text-align: center">Add a new item</h1>

    <section class="" style="text-align: left; padding: 0 2% 0 2%">
      <div class="inputSelect" style="background-color: white">
        <v-form ref="form" lazy-validation>
          <div class="item-info">
            <div class="border">
              <h2>Item specifics</h2>

              <p>Buyers need these details to find your item</p>
              <!-- <label>Colour</label> -->

              <v-text-field
                placeholder="Item name"
                type="text"
                v-model="name"
                dense
                outlined
                required
              ></v-text-field>

              <v-text-field
                placeholder="price"
                type="number"
                v-model="price"
                dense
                outlined
                required
              ></v-text-field>

              <v-text-field
                placeholder="Stock availability"
                type="number"
                v-model="stockQuantity"
                dense
                outlined
                required
              ></v-text-field>
            </div>
          </div>

          <div class="description border">
            <h2>Description</h2>
            <p>Please write a description of your item</p>
            <v-textarea
              class="custom-file-upload"
              style="background-color: #ebe8e8"
              v-model="description"
              outlined
            ></v-textarea>
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
            <v-btn @click.prevent="post" dark>Add new item</v-btn>
          </div>
        </v-form>
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
      //   this.form.append("description", this.description);

      console.log(this.form);

      //   this.$store.dispatch("addProduct", this.form);
    },
  },
  methods: {
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
.border {
  padding: 3%;
  border: 1px;
  border-style: solid;
  /* border-color: rgba(231, 140, 145, 0.3) !important; */
  margin-bottom: 1rem;
}
p {
  font-size: clamp(1rem, 5vw, 0.75rem);
}

.v-btn {
  width: 100%;
  height: 48px !important;
}
.card {
  /* background-color: #D4DBE0; */
  border-radius: 3%;
  padding: 5%;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.left-grid {
  background: url("https://vertyfurniture.co.uk/pub/media/blog/recycled_wood_sideboard_for_sale_uk.png");
}

.auth-grid {
  display: grid;
  grid-template-columns: 40% 60%;
}

.auth-grid-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: #353535; */
  /* border: 0.1rem;
    border-radius: 0.1rem;
    border-style: solid;
    border-color: black; */
  font-size: 3rem;
  color: rgb(10, 6, 6);
  /* box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem; */
  height: 100%;
  width: 100%;
  border-radius: 4px;
  transition: all 500ms;
  overflow: hidden;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* .file {
  height: 300px;
} */
.custom-file-upload {
  text-align: center;
  vertical-align: middle;
  background-color: #ebe8e8;
  border: 1px solid #ccc;
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
</style>
