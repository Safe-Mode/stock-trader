<template>
  <div id="app"
      class="container">
    <AppHeader></AppHeader>
    <AppStart></AppStart>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader'
  import AppStart from './components/AppStart'

  export default {
    components: {
      AppHeader,
      AppStart
    }
  }
</script>

<style lang="scss">
  body {
    font-family: "Bree Serif", "Times New Roman", serif;
  }
</style>
