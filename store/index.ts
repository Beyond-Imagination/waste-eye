import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { API } from '~/types'

export interface State {
  sizeInfo: API.Size,
  items: API.Trash[],
  fetched: boolean
}

export interface Params {
  page?: number
}

export const state = () => ({
  sizeInfo: {
    size: 0,
    pages: 0,
    limit: 0
  },
  items: [],
  fetched: false
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  UPDATE_SIZE_INFO (state: State, sizeInfo: API.Size) {
    state.sizeInfo = sizeInfo
  },
  UPDATE_ITEMS (state: State, items: API.Trash[]) {
    if (!state.fetched) {
      state.fetched = true
      state.items = []
    }
    state.items.push(...items)
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchSize ({ commit }) {
    const { result } = await this.$axios.$get('/api/trashes/size')
    commit('UPDATE_SIZE_INFO', result)
  },
  async fetchItems ({ commit }, params: Params = { page: 1 }) {
    const { page } = params
    const { result } = await this.$axios.$get(`/api/trashes?page=${page}`)

    commit('UPDATE_ITEMS', result)
  }
}

export const getters: GetterTree<RootState, RootState> = {
  sizeInfo: state => state.sizeInfo,
  items: state => Array.from(new Set(state.items).values()),
  ready: state => state.fetched
}
