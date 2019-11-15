/* eslint-disable no-param-reassign, no-shadow */

/**
 * A simple table that fetches data and is then sortable on facets
 */
import Vue from 'vue';

import store from '../../store';
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
    const data = await (
      await fetch('https://api.coinmarketcap.com/v2/ticker/?limit=10')
    ).json();
    const flattenedData = Object.keys(data.data).map(key => ({
      ...data.data[key],
      percent_change_7d: data.data[key].quotes.USD.percent_change_7d,
      price_usd: data.data[key].quotes.USD.price,
    }));
    commit('SET_CRYPTOS', flattenedData);
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
        return [...cryptos].sort(
          ({ percent_change_7d: changeA }, { percent_change_7d: changeB }) =>
            changeB - changeA
        );
      // Sort by negative change
      case 'losers':
        return [...cryptos].sort(
          ({ percent_change_7d: changeA }, { percent_change_7d: changeB }) =>
            changeA - changeB
        );
      // Filter by "rank" by default
      default:
        return [...cryptos].sort(
          ({ rank: rankA }, { rank: rankB }) => rankA - rankB
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
