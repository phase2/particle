/* eslint-disable no-param-reassign, no-shadow */

/**
 * A simple table that fetches data and is then sortable on facets
 */
import Vue from 'vue';

import store from 'protons/store';
import FacetTableComponent from './facet-table.vue';

const map = require('lodash/map');
const sortBy = require('lodash/sortBy');

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
    const cryptosData = await (await fetch(
      'https://api.coinmarketcap.com/v1/ticker/?limit=10'
    )).json();

    const fixedData = map(cryptosData, data => {
      const newData = data;
      newData.percent_change_7d = parseFloat(newData.percent_change_7d);
      newData.rank = parseInt(newData.rank, 10);
      return newData;
    });

    commit('SET_CRYPTOS', fixedData);
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
        return sortBy(cryptos, 'percent_change_7d').reverse();
      // Sort by negative change
      case 'losers':
        return sortBy(cryptos, 'percent_change_7d');
      // Filter by "rank" by default
      default:
        return sortBy(cryptos, 'rank');
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
