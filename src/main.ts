import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import accountSignIn from './components/Auth/AccountSignIn.vue';
import DisplayItems from './components/Marketplace/DisplayItems.vue'
import shoppingCart from './components/Marketplace/ShoppingCart.vue'
import Checkout from './components/Checkout/CheckoutForm.vue'
Vue.config.productionTip = false;

//auth
Vue.component('AccountSignIn', accountSignIn);

//marketplace
Vue.component('DisplayItems', DisplayItems)
Vue.component('ShoppingCart', shoppingCart)
Vue.component("CheckoutForm", Checkout)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
