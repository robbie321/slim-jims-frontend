<template>
  <div class="grid wrapper">
    <div v-for="product in products" :key="product.itemid">
      <div class="card">
        <div>
          <!-- placeholder image -->
          <img
            src="https://jimmybrings-assets.ap-south-1.linodeobjects.com/public/Uploads/993a8cf9ae/597433Young-Henrys-Ntwner-v2.png"
            data-src="https://jimmybrings-assets.ap-south-1.linodeobjects.com/public/Uploads/993a8cf9ae/597433Young-Henrys-Ntwner-v2.png"
            class="image"
            id="img1006"
            style="margin: 10px 0px 0px 0px; cursor: pointer"
            alt="Young Henrys Newtowner"
          />
        </div>
        <div>
          <!-- filter set in main.ts -->
          <h1>{{ product.name | uppercase }}</h1>
          <!-- display the price -->
          <p class="price">€{{ product.price }}</p>

          <!-- add to cart btn -->
          <v-btn
            :disabled="!signedIn"
            class="wrapper crtBtn"
            color="black"
            @click="AddToCart(product)"
            >Add to cart</v-btn
          >
        </div>
      </div>
    </div>

    <!-- show if no products available -->
    <div v-if="products.length == 0">
      <h3>Nothing to see here.....</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
  },
  data: () => ({
    quantity: "",
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  }),
  computed: {
    signedIn() {
      return this.$store.getters.signedIn;
    },
  },
  methods: {
    AddToCart(product) {
      this.$store.dispatch("addToShoppingCart", product);
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin: 20px;
}
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.card {
  margin: auto;
  text-align: left;
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
  font-size: clamp(8px, 2vh, 10px);
  background-color: white;
}

.price {
  color: grey;
  font-size: 22px;
  padding-left: 10px;
}

h1 {
  padding-left: 10px;
  padding-top: 12px;
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: clamp(8px, 2vh, 12px);
}

.card button:hover {
  opacity: 0.7;
}

.crtBtn {
  padding: 10px;
  width: 85% !important;
}

.image {
  width: 28%;
  padding-right: 5px;
  float: left;
  height: 100%;
}
</style>
