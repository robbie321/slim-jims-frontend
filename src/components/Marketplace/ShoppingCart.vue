<template>
  <div>
    <div class="col-25">
      <div class="container">
        <div v-if="!this.$store.state.signedIn">
          <h3 class="text">Please sign in to view your shopping cart</h3>
        </div>
        <div v-else>
          <h4 class="primary-txt">
            Cart items
            <span class="price" style="color: black">
              <i class="tertiary-txt fa fa-shopping-cart"></i>
              <b class="primary-txt" id="cartNo">{{ CartItems.length - 1 }}</b>
            </span>
          </h4>
          <div id="cart-items" class="row" v-for="item in CartItems" :key="item.itemid">
            <div class="col-50">{{ item.name }}</div>
            <div class="col-50" style="text-align: right">€{{ item.price }}</div>
          </div>

          <hr />
          <p>
            Total
            <span class="price" id="total" style="color: black"
              ><b>€{{ CartTotal() }}</b></span
            >
          </p>

          <v-btn class="checkoutBtn" to="/checkout" color="black" dark>Proceed to checkout</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [],
  }),
  computed: {
    CartItems() {
      return this.$store.getters.loadCart;
    },

    IsCartEmpty() {
      if (this.CartItems == null) return false;
      else return false;
    },
  },

  methods: {
    CartTotal() {
      let sum = 0;

      for (let i = 0; i < this.CartItems.length; i++) {
        sum += this.CartItems[i].price;
      }

      return sum;
    },
  },
};
</script>

<style scoped>
.left {
  /* background: pink; */
  width: 40%;
}
.right {
  /* background: blue; */
  /* flex */
  flex-grow: 1;
}
/* this class was taken from W3 schools */
/* https://www.w3schools.com/howto/howto_css_checkout_form.asp */
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  flex: 25%;
}

.col-50 {
  flex: 50%;
}

.col-75 {
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  margin-top: 10px;
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid #000000;
  border-radius: 3px;
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.checkoutBtn {
  width: 100%;
  font-family: sans-serif;
}

span.price {
  float: right;
  color: grey;
}

.text {
  text-align: center;
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
}

.banner {
  background-color: #000000;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (and change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
</style>
