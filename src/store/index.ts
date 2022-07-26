import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    user: null,
    profile: null,
    signedIn: false,
    token: null,
    userRole: null,
    products: [],
    orders:[],
    cart: [{itemid:16,name:'test',price:0, stockQuantity:0}],
    loading: false,
    error: null,
  },
  getters: {
    loadProducts(state){
      return state.products
    },
    loadCart(state){
      return state.cart
    },
    loadProfile(state){
      return state.profile
    },
    loadOrders(state){
      return state.orders
    },
    signedIn(state){
      return state.signedIn
    },
    error(state) {
      return state.error;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setProfile(state, payload){
      state.profile = payload;
    },
    setOrders(state,payload){
      state.orders = payload
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setSignIn(state, payload){
      state.signedIn = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setRole(state, payload){
      state.userRole = payload;
    },
    setProducts(state, payload){
      state.products = payload;
    },
    setCart(state, payload){
        state.cart.push(payload)
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {


    /**
     * ############
     * SIGN USER IN
     * ############
     */
   signUserIn({ commit }, payload) {

    //set loading and clear errors
    commit("setLoading", true);
    commit("clearError");


    //call to backend login route
    axios.post('http://localhost:3000/auth/login', payload).then(user => {

      //set response data to newuser
      const newUser = user.data;

      //assign the bearer token
      const token = newUser.token;
      token !== undefined && commit("setToken", token);

      //store it in the browser session
      localStorage.setItem("session", JSON.stringify(token));

      //if message is not true, show error
      if(newUser.message != 'login successful'){
        commit("setError", newUser.message);
        // commit('setError', newUser.message);
        commit("setLoading", false);

      } else{
        //log user info
        console.log(newUser);

        //assign user values to state
        commit("setUser", newUser.userId);
        commit("setRole", newUser.role);
        commit("setSignIn", true);
        commit("setLoading", false);

          router.push("/")

      }


    })
  },


    /**
     * #################
     * REGITER NEW USER
     * #################
     */
    registerUser({commit}, payload){

    //set loading and clear errors
      commit("setLoading", true);
      commit("clearError");
      let status = false;

      //backend call to register route
      axios.post('http://localhost:3000/auth/register', payload)
      .then(res => {

        //get status of regristration
        status = res.data.successStatus;

        //log status
        console.log("Status",status)

        if(status){
          //sign user in
          this.dispatch('signUserIn', {
            email: payload.email,
            password: payload.password,
          })

          //set loading to false and push to home page
          commit("setLoading", false);
          router.push('/')
        }else{

          commit("setError",res.data.message);
        }

      })
      ///sendgrid email
      // .then(res => {
      //   console.log("RES2",res);
      //   if(success){
      //     let to = payload.email;
      //     let templateId = 'd-3cc42ba710f045c5a134cef17a46f4eb';
      //     let dynamic_template_data = {
      //       name: payload.name
      //     }
      //     this.dispatch("sendTemplate",{to,templateId,dynamic_template_data})
      //   }

      // })
      .catch(error => {
        commit("setLoading", false);

        // const message =
        console.log(error);
      })
      console.log("Registered")
    },

    /**
     * ######
     * Logout
     * ######
     */
     logout({commit}){
      localStorage.removeItem("session");
      sessionStorage.removeItem("vuex");
      // clear session
      // sessionStorage.removeItem('vuex')
      // let t = sessionStorage.getItem('vuex')
      // console.log(t);
      // sessionStorage.setItem('vuex', '');

      //set signedIn to false
      commit('setSignIn', false);
        // push to homepage
        router.push("/")
    },

    /**
     * #######################
     * GET MARKETPLACE PRODUCTS
     * #######################
     */
    loadProducts({commit}, payload){
      commit("setLoading", true);
      axios.get('http://localhost:3000/items/marketplace', payload)
      .then(res => res.data)
      .then(products => {
        console.log("Products",products);
        commit("setLoading", false);
        commit('setProducts', products)
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        console.log(error);
      });
    },

    /**
     * #######################
     * ADD ITEM TO MARKETPLACE
     * #######################
     */
    addProduct({commit}, payload){
      commit("setLoading", true);
      axios.post('http://localhost:3000/items/add-item', {
        name: payload.name,
        price: payload.price,
        stockQuantity: payload.stockQuantity
      })
      .then(() => {
        commit("setLoading", false);
        this.dispatch('loadProducts')
        router.push("/")
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        console.log(error);
      });
    },

    addToShoppingCart({commit}, payload){

      commit('setCart', payload)
    },

        /**
     * #######################
     * PAY FOR ITEMS
     * #######################
     */
    submitPayment({commit}, payload){
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${this.state.token}`
        }
      };
     axios.post("https://warm-plateau-20209.herokuapp.com/payment", payload, config)
      .then( async (res) => {
        console.log("Payload", payload)
        console.log("HERE",res)
        if(res.data.charge.status == 'succeeded'){
          //create an order
          await this.dispatch('createOrder', payload.amount);

          await router.push("/profile")

          alert("You're order has been confirmed");

        }else{
          // console.log("Failed");

          commit("setError", res.data)
          // console.log("Failed", res.data);
        }
      })
    },




    /**
     * #######################
     * GET USER PROFILE
     * #######################
     */
     loadProfile({commit}){
      commit("setLoading", true);
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${this.state.token}`
        }
      };
      axios.get('http://localhost:3000/profile',config)
      .then(res => res.data)
      .then(profile => {
        console.log("Profile",profile);
        commit("setLoading", false);
        commit('setProfile', profile)
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        console.log(error);
      });
    },

        /**
     * #######################
     * UPDATE USER PROFILE
     * #######################
     */
         updateProfile({commit}, payload){
          commit("setLoading", true);
          const config = {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Authorization': `Bearer ${this.state.token}`
            }
          };

          axios.put('http://localhost:3000/users/updateProfileDetails',payload,config)
          .then(res => {
            console.log(res.data);
          })

          commit("setLoading", false);

          console.log("Updated", payload);


        },

      /**
     * #######################
     * GET USER ORDERS
     * #######################
     */
       loadUserOrders({commit}){
        commit("setLoading", true);
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${this.state.token}`
          }
        };
        axios.get('http://localhost:3000/orders/userOrders',config)
        .then(res => res.data)
        .then(orders => {
          console.log("Orders",orders);
          commit("setLoading", false);
          commit('setOrders', orders)
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
      },

           /**
     * #######################
     * CREATE AN ORDERS
     * #######################
     */
      createOrder({commit},payload){

        let totalCost = payload;
        commit("setLoading", true);
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${this.state.token}`
          }
        };
        const items = this.getters.loadCart;

        axios.post("http://localhost:3000/orders/createOrder",
          {items,totalCost}, config
        ).then(res => {
          console.log(res.data);
        })
        commit("setLoading", false);
      },

  },

  modules: {
  },

});
