/* eslint-disable no-param-reassign, no-shadow */

/**
 * A simple table that fetches data and is then sortable on facets
 */
import Vue from 'vue';

import store from 'protons/store';
import FacetTableComponent from './facet-table.vue';

/**
 * STATE
 */
const state = {
  title: 'Cryptos',
  cryptos: [],
  requesting: false,
  filter: 'all',
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
  async fetchCryptos({ commit }) {
    commit('REQUEST_CRYPTOS', true);
    const data = await (await fetch(
      'https://api.coinmarketcap.com/v1/ticker/?limit=10'
    )).json();

    commit('SET_CRYPTOS', data);
    commit('REQUEST_CRYPTOS', false);
  },
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter);
  },
};

/**
 * GETTERS
 */
const getters = {
  filteredCryptos: state => {
    const { cryptos, filter } = state;

    switch (filter) {
      // Sort by positive change
      case 'winners':
        return cryptos.sort(
          ({ percent_change_7d: changeA }, { percent_change_7d: changeB }) =>
            parseFloat(changeA) < parseFloat(changeB)
        );
      // Sort by negative change
      case 'losers':
        return cryptos.sort(
          ({ percent_change_7d: changeA }, { percent_change_7d: changeB }) =>
            parseFloat(changeA) > parseFloat(changeB)
        );
      // Filter by "rank" by default
      default:
        return cryptos.sort(
          ({ rank: rankA }, { rank: rankB }) =>
            parseInt(rankA, 10) > parseInt(rankB, 10)
        );
    }
  },
};

store.registerModule('vueFacetTable', {
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
    render: h => h(FacetTableComponent),
  });
