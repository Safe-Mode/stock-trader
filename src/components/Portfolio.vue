<template>
  <section class="portfolio">
    <p class="portfolio__message"
        v-if="!userStocks.length">You've got no any stocks yet...</p>

    <ul class="portfolio__list row">
      <li class="portfolio__item col-6"
          v-for="(stock, index) in userStocks"
          :key="index">
          <Stock :stock="stock"
              isUser="true"
              @sell-error="onSellError"></Stock>
      </li>
    </ul>

    <sweet-modal icon="error"
        title="Oh noes…"
        ref="sellError">
      You've got only {{ currentStock.quantity }} stocks of {{ currentStock.title }}
    </sweet-modal>
  </section>
</template>

<script>
  import Stock from './Stock'

  export default {
    components: {
      Stock
    },
    computed: {
      userStocks () {
        return this.$store.state.user.stocks
      },
      currentStock () {
        return this.$store.state.user.currentStock
      }
    },
    methods: {
      onSellError () {
        this.$refs.sellError.open()
      }
    }
  }
</script>

<style lang="css">
  .portfolio__list {
    padding: 0;
    list-style: none;
  }

  .portfolio__message {
    margin-top: 30vh;
    font-size: 1.6rem;
    text-align: center;
  }
</style>
