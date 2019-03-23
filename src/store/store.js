import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { getRandomInt } from './../util'

const Difference = {
  MIN: -50,
  MAX: 50
}

Vue.use(VueResource)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    stocks: [],
    isDataDropdown: false
  },
  mutations: {
    setDataDropdown (state, isShown) {
      state.isDataDropdown = isShown
    },
    endDay (state) {
      state.stocks.forEach(stock => {
        const difference = getRandomInt(Difference.MIN, Difference.MAX)
        const newPrice = stock.price + difference

        stock.price = (newPrice > 0) ? newPrice : 0
      })
    },
    addUserStock (state, stock) {
      state.currentStock = state.stocks.find((it, i) => {
        state.user.currentStockIndex = i
        return it.title === stock.title
      })
      state.user.canBuy = state.user.fund - stock.quantity * state.currentStock.price >= 0

      const isExists = state.user.stocks.some(it => {
        return it.title === stock.title
      })

      let currentStock

      if (state.user.canBuy) {
        if (isExists) {
          currentStock = state.user.stocks.find(it => {
            return it.title === stock.title
          })
          currentStock.quantity += stock.quantity
        } else {
          currentStock = state.stocks.find(it => {
            return it.title === stock.title
          })

          const currentStockClone = Object.assign({}, currentStock)

          currentStockClone.quantity = stock.quantity
          state.user.stocks.push(currentStockClone)
        }
      } else {
        stock.errorCb('buy-error')
      }
    },
    updateFund (state, diff) {
      state.user.fund += diff
    },
    removeUserStock (state, stock) {
      state.user.currentStock = state.user.stocks.find((it, i) => {
        state.user.currentStockIndex = i
        return it.title === stock.title
      })

      const newStockQuantity = state.user.currentStock.quantity - stock.quantity
      state.user.canSell = newStockQuantity >= 0

      if (!state.user.canSell) {
        stock.errorCb('sell-error')
      } else if (!newStockQuantity) {
        state.user.stocks.splice(state.user.currentStockIndex, 1)
      } else {
        state.user.currentStock.quantity = newStockQuantity
      }
    },
    SET_STATE (state, data) {
      for (let key in data) {
        state[key] = data[key]
      }
    }
  },
  actions: {
    fetchData ({ commit }, url) {
      Vue.http.get(url)
          .then(response => {
            commit('SET_STATE', response.data)
          }, error => {
            console.log(error.body)
          })
    }
  }
})
