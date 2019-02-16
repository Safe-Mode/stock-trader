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
                placeholder="Quantity"
                v-model="quantity">
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
  export default {
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
      price () {
        return this.$store.state.stocks.find(it => {
          return it.title === this.stock.title
        }).price
      },
      currentStock () {
        return this.$store.state.user.currentStock
      },
      fundDiff () {
        return  this.price * this.quantity
      }
    },
    methods: {
      finishDeal (amount) {
        this.$store.commit('updateFund', amount)
        this.quantity = null
      },
      buyStock () {
        this.$store.commit('addUserStock', {
          title: this.stock.title,
          quantity: this.quantity
        })

        this.finishDeal(-this.fundDiff)
      },
      sellStock () {
        this.$store.commit('removeUserStock', {
          title: this.stock.title,
          quantity: this.quantity
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
