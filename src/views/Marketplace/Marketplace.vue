<template>
  <div class="container">
    <div class="left">
      <div class="hide-banner-xl">
        <AdBanner />
      </div>
      <DisplayItems v-bind:products="Products" />
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
    this.$store.dispatch("loadProducts");
  },
  computed: {
    Products() {
      return this.$store.getters.loadProducts;
    },
  },
};
</script>

<style scoped>
.container {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  /* flex */
  display: flex;
}
.left,
.right {
  /* border: 1px solid #000; */
  overflow: hidden;
}
.left {
  /* background: pink; */
  width: 65%;
}
.right {
  /* flex */
  flex-grow: 1;
}

@media screen and (max-width: 1024px) {
  .right {
    display: none !important;
  }

  .left {
    width: 100%;
    padding-bottom: 50px;
  }
}
</style>
