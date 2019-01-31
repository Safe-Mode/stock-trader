import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      fund: 10000,
      stocks: [{
        title: 'bmw',
        price: 110,
        quantity: 1
      }]
    },
    stocks: [{
      title: 'bmw',
      price: 110,
      quntity: null
    }, {
      title: 'google',
      price: 200,
      quntity: null
    }, {
      title: 'apple',
      price: 250,
      quntity: null
    }, {
      title: 'twitter',
      price: 8,
      quntity: null
    }]
  }
})
