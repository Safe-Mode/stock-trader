<template lang="html">
  <article class="stock card bg-light mb-3 border-0 shadow">
    <header class="card-header"
        :class="isUser ? 'bg-primary' : 'bg-success'">
      <h5 class="card-title text-white mb-0">
        {{ stock.title }}
        <span class="stock__info">
          ( Price: {{ price }}
          <template v-if="stock.quantity">
            | Quantity: {{ stock.quantity }}</template> )
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
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'

  export default {
    name: 'stock',
    props: [
      'stock',
      'isUser'
    ],
    data () {
      return {
        quantity: null
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
      }
    },
    methods: {
      ...mapMutations([
        'updateFund',
        'addUserStock',
        'removeUserStock'
      ]),
      finishDeal (amount) {
        this.updateFund(amount)
        this.quantity = null
      },
      buyStock () {
        this.addUserStock({
          title: this.stock.title,
          quantity: this.quantity,
          errorCb: this.$emit.bind(this)
        })

        if (this.$store.state.user.canBuy) {
          this.finishDeal(-this.fundDiff)
        }
      },
      sellStock () {
        this.removeUserStock({
          title: this.stock.title,
          quantity: this.quantity,
          errorCb: this.$emit.bind(this)
        })

        if (this.currentStock.quantity >= this.quantity) {
          this.finishDeal(this.fundDiff)
        }
      }
    }
  }
</script>

<style lang="css">
  .stock__info {
    font-size: 14px;
  }
</style>
