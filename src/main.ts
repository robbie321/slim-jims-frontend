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
import profile from './components/Profile/ProfileForm.vue'
import Orders from './components/Profile/Orders.vue'

import AdBanner from './components/Marketplace/AdBanner.vue'

Vue.config.productionTip = false;

//auth
Vue.component('AccountSignIn', accountSignIn);

//user profile
Vue.component('Profile', profile);
Vue.component('Orders', Orders);

//marketplace
Vue.component('DisplayItems', DisplayItems)
Vue.component('ShoppingCart', shoppingCart)
Vue.component("CheckoutForm", Checkout)

Vue.component('AdBanner', AdBanner);


Vue.filter('uppercase', function (value: any) {
	return value.toUpperCase()
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
