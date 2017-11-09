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
  title: 'HELLO WORLD',
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
  getTitle: state => state.title,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
