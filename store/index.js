import Vue from 'vue'
import Vuex from 'vuex'

import transactions from './modules/transactions'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      transactions
    }
  })
}

export default createStore