/* eslint-disable no-param-reassign, no-shadow */
/**
 * A simple table that fetches data and is then filter-able on facets
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
  fetchCryptos({ commit }) {
    commit('REQUEST_CRYPTOS', true);
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .then(res => res.json())
      .then(cryptos => commit('SET_CRYPTOS', cryptos))
      .then(() => commit('REQUEST_CRYPTOS', false));
  },
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter);
  },
};

/**
 * GETTERS
 */
const getters = {
  positiveWeek: state =>
    state.cryptos.filter(
      ({ percent_change_7d: change }) => parseFloat(change) > 0
    ),
  filteredCryptos: state => {
    const { cryptos, filter } = state;
    switch (filter) {
      case 'winners':
        return cryptos.sort(
          ({ percent_change_7d: changeA }, { percent_change_7d: changeB }) =>
            parseFloat(changeA) < parseFloat(changeB)
        );
      case 'losers':
        return cryptos.sort(
          ({ percent_change_7d: changeA }, { percent_change_7d: changeB }) =>
            parseFloat(changeA) > parseFloat(changeB)
        );
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

const FacetTable = Vue.extend({
  // el: '#vue-facet-table',
  store,
  render: h => h(FacetTableComponent),
});

export default FacetTable;
