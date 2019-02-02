<template lang="html">
  <section class="portfolio">
    <ul class="portfolio__list row">
      <li class="portfolio__item col-6"
          v-for="stock in userStocks">
          <Stock :stock="stock"
              isUser="true"></Stock>
      </li>
    </ul>
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
