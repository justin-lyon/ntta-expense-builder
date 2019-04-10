const namespaced = true

const state = () => ({
  transactions: []
})

const getters = {
  getTransactions: state => state.transactions
}

const mutations = {
  setTransactions(state, transactions) {
    state.transactions = transactions
  }
}

const actions = {}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}