/* eslint-disable no-param-reassign, no-shadow */
import Vue from 'vue';

import store from '../../../00-protons/store';
import App from './app.vue';

/**
 * STATE
 */
const state = {
  message: "Good news everyone! Store's open for business.",
  card: '',
};

/**
 * MUTATIONS
 */
const mutations = {
  ADD_CARD_ITEMS(state, items) {
    state.card = items;
  },
};

/**
 * ACTIONS
 */
const actions = {
  getCardItems: ({ commit }) =>
    // You can make whatever API call you need here in actions.
    // In this case, we're using fetch to grab an example json file.
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => commit('ADD_CARD_ITEMS', data)),
};

/**
 * GETTERS
 */
const getters = {
  getMessage: state => state.message,
  getCard: state => state.card,
};

/**
 * Register
 */
store.registerModule('vueWidget', {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
});

// if (document.getElementById('vue-example-widget')) {
//
// }

const VueWidget = new Vue({
  // el: '#vue-example-widget',
  store,
  render: h => h(App),
});

export default VueWidget;
