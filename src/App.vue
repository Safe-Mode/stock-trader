<template>
  <div id="app"
      class="container">
    <AppHeader></AppHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader'

  export default {
    components: {
      AppHeader
    }
  }
</script>

<style lang="scss">
  body {
    font-family: "Bree Serif", "Times New Roman", serif;
  }

  .sweet-modal {
    .sweet-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .sweet-content-content {
      font-size: 18px;
    }
  }
</style>
