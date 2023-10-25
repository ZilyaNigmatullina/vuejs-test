import Vue from 'vue';
import Vuex from 'vuex';
// import api from '@/api';
import getPayments from '../mocks/getPayments';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    pageCount: 1,
    isLoading: false,
    isCached: false,
    cachedData: new Map(),
  }),

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
    setCachedData(state, { key = '', response }) {
      state.cachedData.set(key, response);
    },
    clearCachedData(state) {
      state.cachedData.clear();
    },
  },

  actions: {
    async load({ state, commit, dispatch }, params = {}) {
      commit('setState', { isLoading: true });

      try {
        const key = JSON.stringify(Object.fromEntries(Object.entries(params).sort(([, a], [, b]) => a - b)));

        if
        (state.cachedData.has(key)) {
          const { data, pageCount } = state.cachedData.get(key);
          commit('setState', { data, pageCount });
          return;
        }

        const response = await getPayments(params); // api.getPayments(params)
        const { data, pageCount } = response;

        if (Array.isArray(data)) {
          commit('setState', { data, pageCount });
          dispatch('cache', { key, response });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },
    cache({ commit }, { key = '', response }) {
      commit('setCachedData', { key, response });
      commit('setState', { isCached: true });
    },
    clearCache({ commit }) {
      commit('clearCachedData');
      commit('setState', { isCached: false });
    },
  },
});
