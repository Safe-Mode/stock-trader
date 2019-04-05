<template lang="html">
  <article class="stock card bg-light mb-3 border-0 shadow">
    <header class="card-header"
        :class="isUser ? 'bg-primary' : 'bg-success'">
      <h5 class="card-title text-white mb-0">
        {{ stock.title }}
        <span class="stock__info">
          ( Price: {{ animatedPrice }}
          <template v-if="stock.quantity">
            | Quantity: {{ animatedQuantity }}</template> )
        </span>
      </h5>
    </header>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col">
            <input type="number"
                class="form-control"
                min="1"
                placeholder="Quantity"
                v-model.number="quantity">
          </div>
          <div class="col">
            <button type="submit"
                v-if="!isUser"
                class="btn btn-success"
                :disabled="!quantity"
                @click.prevent="buyStock">Buy</button>

            <button type="submit"
                v-else
                class="btn btn-danger"
                :disabled="!quantity"
                @click.prevent="sellStock">Sell</button>
          </div>
        </div>
      </form>
    </div>
  </article>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { TweenMax } from 'gsap/TweenMax'
  import { DURATION_TRANSITION_STATE } from '../util'

  export default {
    name: 'stock',
    props: [
      'stock',
      'index',
      'isUser'
    ],
    data () {
      return {
        quantity: null,
        tweenedQuantity: 0,
        tweenedPrice: 0
      }
    },
    computed: {
      ...mapState({
        stocks: state => state.stocks,
        currentStock: state => state.user.currentStock
      }),
      price () {
        return this.stocks.find(it => {
          return it.title === this.stock.title
        }).price
      },
      fundDiff () {
        return  this.price * this.quantity
      },
      animatedQuantity () {
        return this.tweenedQuantity.toFixed(0)
      },
      animatedPrice () {
        return this.tweenedPrice.toFixed(0)
      }
    },
    methods: {
      ...mapMutations([
        'UPDATE_FUND',
        'ADD_USER_STOCK',
        'REMOVE_USER_STOCK'
      ]),
      finishDeal (amount) {
        this.UPDATE_FUND(amount)
        this.quantity = null
      },
      buyStock () {
        this.ADD_USER_STOCK({
          title: this.stock.title,
          quantity: this.quantity,
          errorCb: this.$emit.bind(this)
        })

        if (this.$store.state.user.canBuy) {
          this.finishDeal(-this.fundDiff)
        }
      },
      sellStock () {
        this.$emit('stock-remove', this.index)
        this.REMOVE_USER_STOCK({
          title: this.stock.title,
          quantity: this.quantity,
          errorCb: this.$emit.bind(this)
        })

        if (this.currentStock.quantity >= this.quantity) {
          this.finishDeal(this.fundDiff)
        }
      }
    },
    watch: {
      stock: {
        handler (newVal) {
          TweenLite.to(this.$data, DURATION_TRANSITION_STATE, { tweenedQuantity: newVal.quantity })
        },
        deep: true
      },
      price (newVal) {
        TweenLite.to(this.$data, DURATION_TRANSITION_STATE, { tweenedPrice: newVal })
      }
    },
    created () {
      this.tweenedQuantity = this.stock.quantity,
      this.tweenedPrice = this.stock.price
    }
  }
</script>

<style lang="css">
  .stock__info {
    font-size: 14px;
  }
</style>
