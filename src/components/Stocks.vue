<template lang="html">
  <section class="stocks">
    <ul class="stocks__list row">
      <li class="stocks__item col-6"
          v-for="stock in stocks">
          <Stock :stock="stock"
              @buy-error="onBuyError"></Stock>
      </li>
    </ul>

    <sweet-modal icon="error"
        title="Oh noes…"
        ref="buyError">
      You've got not enought funds! Try to set less quantity.
    </sweet-modal>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import Stock from './Stock'

  export default {
    name: 'stocks',
    computed: {
      ...mapState({
        stocks: state => state.stocks,
        currentStock: state => state.user.currentStock
      })
    },
    methods: {
      onBuyError () {
        this.$refs.buyError.open()
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
