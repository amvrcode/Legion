import { createStore } from 'vuex'

export default createStore({
  state: {
    categoryId: 'popular'
  },
  getters: {
  },
  mutations: {
    getCategoryId(state, id) {
      this.state.categoryId = id
    }
  },
  actions: {
  },
  modules: {
  }
})
