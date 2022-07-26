<template>
  <div class="grid wrapper">
    <div v-for="product in products" :key="product.itemid">
      <div class="card">
        <div class="">
          <!-- image goes here -->
          <h1>{{ product.name }}</h1>
          <p class="price">€{{ product.price }}</p>
          <!-- <v-select :items="items" label="Quantity" outlined></v-select> -->

          <v-btn class="wrapper crtBtn" color="black" @click="AddToCart(product)"
            >Add to cart</v-btn
          >
        </div>
      </div>
    </div>
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
  methods: {
    AddToCart(product) {
      this.$store.dispatch("addToShoppingCart", product);
    },
    computed: {
      ShoppingCartItems() {
        console.log(this.CartItems.length);

        return this.$store.getters.loadCart;
      },
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

/* .griditem {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  text-align: center;
  font-size: 24px;
  color: rgb(0, 0, 0);
  height: 100%;
  width: 100%;
  border-radius: 4px;
  transition: all 500ms;
  overflow: hidden;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.griditem:hover {
  cursor: pointer;
} */

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: left;
  font-family: arial;
  background-color: white;
}

.price {
  color: grey;
  font-size: 22px;
  padding-left: 10px;
}

h1 {
  padding-left: 10px;
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.card button:hover {
  opacity: 0.7;
}

.crtBtn {
  padding: 10px;
  width: 85% !important;
}
</style>
