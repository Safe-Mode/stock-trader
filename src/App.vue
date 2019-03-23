<template>
  <div id="app"
      class="container"
      @click="isDataDropDown = false">
    <AppHeader></AppHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import AppHeader from './components/AppHeader'

  export default {
    components: {
      AppHeader
    },
    methods: {
      ...mapActions([
        'fetchData'
      ])
    },
    created () {
      this.fetchData('http://localhost:3000/initial')
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
