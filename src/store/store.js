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
      stocks: []
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
        stock.price += difference
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
    }
  }
})
