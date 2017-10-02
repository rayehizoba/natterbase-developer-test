import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testValue: null
  },

  getters: {
    getTestValue: state => {
      return state.testValue
    }
  },

  mutations: {
    updateTestValue (state, value) {
      state.testValue = value
    }
  }
})
