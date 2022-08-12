<template>
  <div>
    <div class="wrapper">
      <!-- this html was taken from W3 Schools
        I added by own id's and divs to make it fit my cart items from local storage
      https://www.w3schools.com/howto/howto_css_checkout_form.asp-->
      <v-alert v-show="error" dismissible prominent shaped type="error" style="margin-top: 20px">{{
        error
      }}</v-alert>
      <div class="row" id="card">
        <div class="col-75">
          <div class="container">
            <form>
              <div class="row">
                <div class="col-50">
                  <h3 class="primary-txt">Billing Address</h3>

                  <!-- Name -->
                  <label for="fname"><i class="tertiary-txt fas fa-user"></i> Full Name</label>
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="Robbie Malone"
                    v-model="name"
                  />
                  <!-- Name error -->
                  <span class="help is-danger" v-if="nameErrorCheck">{{ nameErrorCheck }}</span>

                  <!-- Email -->
                  <label for="email"><i class="tertiary-txt fa fa-envelope"></i> Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    v-model="email"
                    placeholder="john@example.com"
                  />
                  <!-- Email error -->
                  <span class="help is-danger" v-if="emailErrorCheck">{{ emailErrorCheck }}</span>

                  <!-- Address -->
                  <label for="adr"><i class="tertiary-txt far fa-address-card"></i> Address</label>
                  <input
                    type="text"
                    id="adr"
                    name="address"
                    v-model="address.line1"
                    placeholder="21 John Street"
                  />
                  <!-- Address error -->
                  <span class="help is-danger" v-if="addressErrorCheck">{{
                    addressErrorCheck
                  }}</span>

                  <!-- City -->
                  <label for="city"><i class="tertiary-txt fas fa-city"></i> City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    v-model="address.county"
                    placeholder="Co. Kilkenny"
                  />
                  <!-- City error -->
                  <span class="help is-danger" v-if="cityErrorCheck">{{ cityErrorCheck }}</span>

                  <!-- Eircode -->
                  <div class="row">
                    <div class="col-50">
                      <label for="Eircode">Eircode</label>
                      <input
                        type="text"
                        id="Eircode"
                        name="Eircode"
                        v-model="address.eircode"
                        placeholder="R95 0000"
                      />
                      <!-- Ericode error -->
                      <span class="help is-danger" v-if="eircodeErrorCheck">{{
                        eircodeErrorCheck
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="col-50">
                  <h3 class="primary-txt">Payment</h3>

                  <!-- Card Name -->
                  <label for="cname">Name on Card</label>
                  <input
                    type="text"
                    id="cname"
                    name="cardname"
                    v-model="cardName"
                    placeholder="Robbie Malone"
                  />
                  <!-- Card name error -->
                  <span class="help is-danger" v-if="cardNameErrorCheck">{{
                    cardNameErrorCheck
                  }}</span>

                  <!-- Card Number -->
                  <label for="ccnum">Credit card number</label>
                  <input
                    type="text"
                    id="ccnum"
                    name="cardnumber"
                    v-model="card.number"
                    placeholder="4242-4242-4242-4242"
                  />
                  <!-- Card number error -->
                  <span class="help is-danger" v-if="cardNumberErrorCheck">{{
                    cardNumberErrorCheck
                  }}</span>

                  <!-- Exp month -->
                  <label for="expmonth">Exp month</label>
                  <input
                    type="text"
                    id="expmonth"
                    name="expmonth"
                    v-model="card.exp_month"
                    placeholder="12"
                  />
                  <!-- ExpMon Error -->
                  <span class="help is-danger" v-if="expmonErrorCheck">{{ expmonErrorCheck }}</span>

                  <!-- Exp Year -->
                  <label for="expyear">Exp Year</label>
                  <input
                    type="text"
                    id="expyear"
                    name="expyear"
                    v-model="card.exp_year"
                    placeholder="34"
                  />
                  <!-- ExpYear Error -->
                  <span class="help is-danger" v-if="expyearErrorCheck">{{
                    expyearErrorCheck
                  }}</span>

                  <!-- Security pin -->
                  <div class="row">
                    <div class="col-50">
                      <label for="cvv">CVC</label>
                      <input type="text" id="cvv" name="cvv" v-model="card.cvc" placeholder="000" />
                      <!-- CVV Error -->
                      <span class="help is-danger" v-if="cvvErrorCheck">{{ cvvErrorCheck }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                @click.prevent="validate()"
                id="checkout-button"
                type="submit"
                class="secondary-bg"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>

        <div class="col-25">
          <div class="container">
            <h4 class="primary-txt">
              Cart
              <span class="price" style="color: black">
                <i class="tertiary-txt fa fa-shopping-cart"></i>
                <b class="primary-txt" id="cartNo">{{ CartItems.length - 1 }}</b>
              </span>
            </h4>
            <div id="cart-items" v-for="item in CartItems" :key="item.itemid">
              {{ item.name }}
            </div>

            <hr />
            <p>
              Total
              <span class="price" id="total" style="color: black"
                ><b>€{{ CartTotal() }}</b></span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [],
    name: "",
    stripeKey:
      "pk_test_51LNMHmLRGR9Go4BFu0paMus4he7l2EbwSQm8IG5Iu6RKHeIynBGiZidbzA0r1NAdDtzAcmz5WqX4y5TaxGGJnfhT00tC5GXrvK",
    email: "",
    cardName: "",
    card: {
      number: "",
      cvc: "",
      exp_month: "",
      exp_year: "",
    },

    address: {
      line1: "",
      line2: "",
      county: "",
      eircode: "",
    },

    // error check
    nameErrorCheck: null,
    emailErrorCheck: null,
    addressErrorCheck: null,
    cityErrorCheck: null,
    eircodeErrorCheck: null,
    cardNameErrorCheck: null,
    cardNumberErrorCheck: null,
    expmonErrorCheck: null,
    expyearErrorCheck: null,
    cvvErrorCheck: null,
  }),

  beforeCreate() {
    this.$store.state.error = null;
  },

  computed: {
    CartItems() {
      return this.$store.getters.loadCart;
    },

    filteredCartItems(val) {
      if (this.CartItems().indexOf(val.itemid) === -1) {
        items.push(val);
        return val.itemid;
      }
    },
    error() {
      return (this.err = this.$store.getters.error);
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

    createToken() {
      this.cardCheckError = false;
      window.Stripe.setPublishableKey(this.stripeKey);
      window.Stripe.createToken(this.card, $.proxy(this.stripeResponseHandler, this));
      this.cardCheckSending = true;
    },

    stripeResponseHandler(status, response) {
      this.cardCheckSending = false;
      if (response.error) {
        this.cardCheckErrorMessage = response.error.message;
        this.cardCheckError = true;

        //set state error
        this.$store.state.error = response.error.message;

        console.error("CARD ERROR", response.error);
      } else {
        // token to create a charge on the server
        var token_from_stripe = response.id;
        var request = {
          name: this.cardName,
          amount: this.CartTotal() * 100,
          email: this.email,
          card: this.card,
          address: this.address,
          token_from_stripe: token_from_stripe,
        };

        //reset cart
        this.$store.state.cart = [{ itemid: 16, name: "test", price: 0, stockQuantity: 0 }];

        // Send to our server
        this.$store.dispatch("submitPayment", request);
      }
    },

    validate() {
      this.clearCardErrors();
      let valid = true;
      if (!this.name) {
        valid = false;
        this.nameErrorCheck = "Please enter a name";
      }
      if (!this.email) {
        valid = false;
        this.emailErrorCheck = "Please provide an email address";
      }

      if (!this.cardName) {
        valid = false;
        this.cardNameErrorCheck = "Card Name cannot be empty";
      }
      if (!this.card.exp_year) {
        valid = false;
        this.expyearErrorCheck = "Exp year cannot be empty";
      }
      // billing info
      if (!this.card.exp_month) {
        valid = false;
        this.expmonErrorCheck = "Exp month cannot be empty";
      }
      if (!this.card.number) {
        valid = false;
        this.cardNumberErrorCheck = "Card number cannot be empty";
      }
      if (!this.card.cvc) {
        valid = false;
        this.cvvErrorCheck = "Security cvv cannot be empty";
      }
      if (!this.address.line1) {
        valid = false;
        this.addressErrorCheck = "Address cannot be empty";
      }
      if (!this.address.county) {
        valid = false;
        this.cityErrorCheck = "County cannot be empty";
      }
      if (!this.address.eircode) {
        valid = false;
        this.eircodeErrorCheck = "Eircode cannot be empty";
      }
      if (valid) {
        this.createToken();
      }
    },
    clearCardErrors() {
      (this.emailErrorCheck = null),
        (this.cardNameErrorCheck = null),
        (this.addressErrorCheck = null),
        (this.cvvErrorCheck = null),
        (this.cardNumberErrorCheck = null),
        (this.expmonErrorCheck = null),
        (this.countyError = null),
        (this.eircodeError = null),
        (this.expyearErrorCheck = null);
      this.nameErrorCheck = null;
    },
  },

  mounted() {
    let Stripe = document.createElement("script");
    Stripe.setAttribute("src", "https://js.stripe.com/v2/");
    document.head.appendChild(Stripe);
    let jquery = document.createElement("script");
    jquery.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js");
    document.head.appendChild(jquery);
  },
};
</script>

<style scoped>
.wrapper {
  max-width: 1500px;
  margin: 0 auto;
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
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid #000000;
  border-radius: 3px;
}

label {
  margin-top: 8px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

#checkout-button {
  color: rgb(255, 255, 255);
  padding: 12px;
  background-color: #000000;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

#checkout-button:hover {
  background-color: #2d2d2d;
}

input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid rgb(0, 0, 0);
  background-color: white;
  box-sizing: border-box;
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
}

span.price {
  float: right;
  color: grey;
}

div[aria-required="true"].v-text-field .v-label::after {
  content: " *";
  color: red;
}

.help {
  color: red;
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
