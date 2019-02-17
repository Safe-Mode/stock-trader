import Vue from 'vue'
import Vuex from 'vuex'
import { getRandomInt } from './../util'

const Difference = {
  MIN: -50,
  MAX: 50
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      fund: 10000,
      stocks: [],
      currentStock: {},
      currentStockIndex: null
    },
    stocks: [{
      title: 'bmw',
      price: 110
    }, {
      title: 'google',
      price: 200
    }, {
      title: 'apple',
      price: 250
    }, {
      title: 'twitter',
      price: 8
    }]
  },
  mutations: {
    endDay (state) {
      state.stocks.forEach(stock => {
        const difference = getRandomInt(Difference.MIN, Difference.MAX)
        const newPrice = stock.price + difference

        stock.price = (newPrice > 0) ? newPrice : 0
      })
    },
    addUserStock (state, stock) {
      const isExists = state.user.stocks.some(it => {
        return it.title === stock.title
      })
      let currentStock

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

      if (newStockQuantity < 0) {
        stock.errorCb()
      } else if (!newStockQuantity) {
        state.user.stocks.splice(state.user.currentStockIndex, 1)
      } else {
        state.user.currentStock.quantity = newStockQuantity
      }
    }
  }
})
