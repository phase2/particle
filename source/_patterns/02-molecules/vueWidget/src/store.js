/* eslint-disable no-shadow, no-param-reassign */
/**
 * Vuex Store
 */
import Vue from 'vue';
import Vuex from 'vuex';
import $ from 'jquery';

Vue.use(Vuex);

/**
 * STATE
 */
const state = {
  message: 'Good news everyone! Store\'s open for business.',
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
  getCardItems: ({ commit }) => {
    // You can make whatever API call you need here in actions.
    // In this case, it's jquery grabbing an example json file.
    $.getJSON('https://jsonplaceholder.typicode.com/users', (data) => {
      // Your action should commit a mutation on the state.
      commit('ADD_CARD_ITEMS', data);
    });
  },
};

/**
 * GETTERS
 */
const getters = {
  getMessage: state => state.message,
  getCard: state => state.card,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
