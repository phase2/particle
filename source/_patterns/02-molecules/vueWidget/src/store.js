/* eslint-disable no-shadow */
/**
 * Vuex Store
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * STATE
 */
const state = {
  message: 'Good news everyone! Store\'s open for business.',
};

/**
 * MUTATIONS
 */
const mutations = {

};

/**
 * ACTIONS
 */
const actions = {

};

/**
 * GETTERS
 */
const getters = {
  getMessage: state => state.message,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
