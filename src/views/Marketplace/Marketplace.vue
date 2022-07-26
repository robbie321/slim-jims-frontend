<template>
  <div class="container">
    <div class="left">
      <DisplayItems v-bind:products="Products" />
      <!-- <v-btn @click="loadMoreProducts()">Load more</v-btn> -->
    </div>
    <div class="right">
      <ShoppingCart />
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    products: [],
  }),
  beforeCreate() {
    let payload = {
      skip: 0,
      take: 9,
    };
    this.$store.dispatch("loadProducts", payload);
  },
  computed: {
    Products() {
      return this.$store.getters.loadProducts;
    },
    loadMoreProducts() {
      this.$store.dispatch("loadProducts");
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  /* flex */
  display: flex;
}
.left,
.right {
  border: 1px solid #000;
  overflow: hidden;
}
.left {
  /* background: pink; */
  width: 65%;
}
.right {
  /* background: blue; */
  /* flex */
  flex-grow: 1;
}

@media screen and (max-width: 1024px) {
  .right {
    display: none !important;
  }

  .left {
    width: 100%;
  }
}
</style>
