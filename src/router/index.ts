import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// sign in
import SignIn from '../views/Auth/SignInPage.vue';
import CreateAccount from '../components/Auth/NewAccountForm.vue';

//Admin
import AddItem from '../components/Admin/AddItem.vue'

//Marketplace
import Marketplace from '../views/Marketplace/Marketplace.vue'
import Checkout from '../views/Checkout/Checkout.vue'
import { component } from 'vue/types/umd';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Marketplace',
    component: Marketplace,
    meta: { title: 'Marketplace' },
  },
  {
    path: '/checkout',
    component: Checkout,
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn,
    meta: { title: 'Sign In' },
  },
  {
    path: '/createAccount',
    name: 'Create Account',
    component: CreateAccount,
    meta: { title: 'Register' },
  },
  {
    path: '/addItem',
    name: 'Add Item',
    component: AddItem,
    meta: {title: 'Add Item'},
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
