<template lang="html">
  <main class="content jumbotron shadow bg-white">
    <p class="content__title font-weight-bold">Trade or View your portfolio</p>

    <p>You may Save & Load your Data</p>
    <p>CLickon "End Day" to begin a new Day!</p>

    <b class="content__user d-block mt-5">
      <span>Your Funds:</span>
      <span>${{ fund }}</span>
    </b>
  </main>
</template>

<script>
  export default {
    computed: {
      fund () {
        return this.$store.state.fund
      }
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
