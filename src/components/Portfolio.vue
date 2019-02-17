<template lang="html">
  <section class="portfolio">
    <ul class="portfolio__list row">
      <li class="portfolio__item col-6"
          v-for="stock in userStocks">
          <Stock :stock="stock"
              isUser="true"
              v-on:stock-error="onStockError"></Stock>
      </li>
    </ul>

    <sweet-modal icon="error"
        title="Oh noes…"
        ref="modalError">
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
      onStockError () {
        this.$refs.modalError.open()
      }
    }
  }
</script>

<style lang="css">
  .portfolio__list {
    padding: 0;
    list-style: none;
  }
</style>
