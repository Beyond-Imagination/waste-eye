import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { API } from '~/types'

export interface State {
  cctvGroupList: API.CctvGroup[]
}

export const state = (): State => ({
  cctvGroupList: []
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  UPDATE_CCTV_GROUP_LIST (state: State, itemList: API.CctvGroup[]) {
    state.cctvGroupList = itemList
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchCctvGroupList ({ commit }) {
    const { result } = await this.$axios.$get('/api/cctv')
    commit('UPDATE_CCTV_GROUP_LIST', result as API.CctvGroup[])
  },
  async nuxtServerInit ({ rootGetters, dispatch }) {
    if (rootGetters.cctvGroupList.length === 0) {
      await dispatch('fetchCctvGroupList')
    }
  }
}

export const getters: GetterTree<RootState, RootState> = {
  cctvGroupList: state => state.cctvGroupList
}
