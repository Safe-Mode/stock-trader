<template lang="html">
  <section class="stocks">
    <ul class="stocks__list row">
      <li class="stocks__item col-6"
          v-for="stock in stocks">
          <Stock :stock="stock"></Stock>
      </li>
    </ul>
  </section>
</template>

<script>
  import Stock from './Stock'

  export default {
    computed: {
      stocks () {
        return this.$store.state.stocks
      }
    },
    components: {
      Stock
    }
  }
</script>

<style lang="css">
  .stocks__list {
    padding: 0;
    list-style: none;
  }
</style>
