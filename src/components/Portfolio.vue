<template>
  <section class="portfolio">
    <transition mode="out-in"
        enter-active-class="animated fadeIn faster"
        leave-active-class="animated fadeOut faster">
      <p class="portfolio__message"
          v-if="!stocks.length">You've got no any stocks yet...</p>

      <transition-group class="portfolio__list row"
          tag="ul"
          :leave-active-class="`animated ${stockAnimateClass} faster stock-leave-active`"
          v-else>
        <li class="portfolio__item col-sm-6"
            v-for="(stock, index) in stocks"
            :key="stock.title">
            <Stock :stock="stock"
                :index="index"
                isUser="true"
                @sell-error="onSellError"
                @stock-remove="getStockAnimateClass"></Stock>
        </li>
      </transition-group>
    </transition>

    <sweet-modal icon="error"
        title="Oh noes…"
        ref="sellError">
      You've got only {{ currentStock.quantity }} stocks of {{ currentStock.title }}
    </sweet-modal>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import Stock from './Stock'
  import { RADIX_TEN, MILLISEC_FACTOR, getCoords } from '../util'

  export default {
    name: 'portfolio',
    data () {
      return {
        stockAnimateClass: 'fadeOutLeft'
      }
    },
    components: {
      Stock
    },
    computed: {
      ...mapState({
        stocks: state => (state.user.stocks) ? state.user.stocks : [],
        currentStock: state => (state.user.currentStock) ? state.user.currentStock : {}
      })
    },
    methods: {
      onSellError () {
        this.$refs.sellError.open()
      },
      getStockAnimateClass (index) {
        this.stockAnimateClass = (index % 2) ? 'fadeOutRight' : 'fadeOutLeft'
      },
      setItemsCoords () {
        document.querySelectorAll('.portfolio__item').forEach((item) => {
          const timeout = parseFloat(window.getComputedStyle(item).transitionDuration, RADIX_TEN) * MILLISEC_FACTOR

          window.setTimeout(() => {
            const coords = getCoords(item)

            item.style.left = `${coords.left}px`
            item.style.top = `${coords.top}px`
            item.style.width = window.getComputedStyle(item).width
          }, timeout)
        })
      }
    },
    mounted () {
      this.setItemsCoords()
    },
    updated () {
      window.setTimeout(() => {
        this.setItemsCoords()
      }, 600)
    }
  }
</script>

<style lang="scss">
  .portfolio__list {
    padding: 0;
    list-style: none;
  }

  .portfolio__item {
    position: static;
    transition: all 0.5s;
  }

  .portfolio__message {
    margin-top: 30vh;
    font-size: 1.6rem;
    text-align: center;
  }

  .stock-leave-active {
    position: absolute;
  }
</style>
