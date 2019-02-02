<template>
  <header class="app-header my-4">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/"
          class="navbar-brand"
          exact>Stock Trader</router-link>
      <button class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse"
          id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link to="/portfolio"
              tag="li"
              class="nav-item"
              active-class="active">
            <a class="nav-link">Portfolio</a>
          </router-link>
          <router-link to="/stocks"
              tag="li"
              class="nav-item"
              active-class="active">
            <a class="nav-link">Stocks</a>
          </router-link>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link"
                href="#"
                @click.prevent="endDay">End day</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
              Save & Load
            </a>
            <div class="dropdown-menu"
                aria-labelledby="navbarDropdown">
              <a class="dropdown-item"
                  href="#">Save data</a>
              <a class="dropdown-item"
                  href="#">Load data</a>
            </div>
          </li>
        </ul>

        <b class="navbar-text">
          <span>Funds:</span>
          <span>${{ fund }}</span>
        </b>
      </div>
    </nav>
  </header>
</template>

<script>
  import { mapMutations } from 'Vuex'

  export default {
    computed: {
      fund () {
        return this.$store.state.user.fund
      }
    },
    methods: {
      ...mapMutations([
        'endDay'
      ])
    }
  }
</script>

<style lang="scss">

</style>
