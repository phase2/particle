/* eslint-disable no-param-reassign, no-shadow */
/**
 * A simple table that fetches data and is then filter-able on facets
 */
import Vue from 'vue';

import store from 'protons/store';
import FacetTable from './facet-table.vue';

/**
 * STATE
 */
const state = {
  title: 'Cryptos',
  cryptos: [],
  requesting: false,
};

/**
 * MUTATIONS
 */
const mutations = {
  REQUEST_CRYPTOS(state, requesting) {
    state.requesting = requesting;
  },
  SET_CRYPTOS(state, cryptos) {
    state.cryptos = cryptos;
  },
  SET_FILTER(state, filter) {
    state.filter = filter;
  },
};

/**
 * ACTIONS
 */
const actions = {
  fetchCryptos({ commit }) {
    commit('REQUEST_CRYPTOS', true);
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .then(res => res.json())
      .then(cryptos => commit('SET_CRYPTOS', cryptos))
      .then(() => commit('REQUEST_CRYPTOS', false));
  },
};

/**
 * GETTERS
 */
const getters = {};

store.registerModule('vueFacetTable', {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
});

const FacetTableInit = new Vue({
  el: '#vue-facet-table',
  store,
  render: h => h(FacetTable),
});

export default FacetTableInit;
