/* eslint-disable no-param-reassign, no-shadow */
/**
 * A simple store that fetches data for display.
 */
import Vue from 'vue';

import store from 'protons/store';
import <%= capitalizedName %> from './<%= name %>.vue';

/**
 * STATE
 */
const state = {
  nodes: [],
  requesting: false,
};

/**
 * MUTATIONS
 */
const mutations = {
  REQUEST_DATA(state, requesting) {
    state.requesting = requesting;
  },
  SET_DATA(state, data) {
    state.nodes = data;
  },
};

/**
 * ACTIONS
 */
const actions = {
  async fetchData({ commit }, data) {
    commit('REQUEST_DATA', true);
    commit('SET_DATA', data);
    commit('REQUEST_DATA', false);
  },
};

/**
 * GETTERS
 */
const getters = {
  nodes: state => state.nodes,
  findNodes: (state, getters) => date =>
    getters.nodes.filter(node => node.date === date),
};

store.registerModule('<%= name %>', {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
});

export default el =>
  new Vue({
    el,
    store,
    render: h => h(<%= capitalizedName %>),
  });
