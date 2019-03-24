<template>
  <div id="app"
      class="container"
      @click="isDataDropDown = false">
    <AppHeader></AppHeader>

    <transition mode="out-in"
        enter-active-class="animated fadeInLeft faster"
        leave-active-class="animated fadeOutDown faster"
        appear>
      <router-view></router-view>
    </transition>
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
      this.fetchData('initial')
    }
  }
</script>

<style lang="scss">
  @import "~animate.css/animate";

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
