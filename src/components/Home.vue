<template lang="html">
  <section class="content jumbotron shadow bg-white">
    <p class="content__title font-weight-bold">Trade or View your portfolio</p>

    <p>You may Save & Load your Data</p>
    <p>CLick on "End Day" to begin a new Day!</p>

    <b class="content__user d-block mt-5">
      <span>Your Funds:</span>
      <span>{{ fund | currency }}</span>
    </b>
  </section>
</template>

<script>
  import { mapState } from 'Vuex'

  export default {
    computed: {
      ...mapState({
        fund: state => (state.user) ? state.user.fund : 0
      })
    }
  }
</script>

<style lang="css">
  .content__title {
    font-size: 32px;
  }

  .content__user {
    font-size: 24px;
    letter-spacing: 0.01em;
  }
</style>
