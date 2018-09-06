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
};

/**
 * MUTATIONS
 */
const mutations = {};

/**
 * ACTIONS
 */
const actions = {};

/**
 * GETTERS
 */
const getters = {};

store.registerModule('vueFacetTable', {
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
