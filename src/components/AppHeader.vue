<template>
  <header class="app-header my-4">
    <nav class="app-nav navbar navbar-expand-lg navbar-light bg-light">
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

      <div class="app-nav__collapse collapse navbar-collapse"
          id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link to="/portfolio"
              tag="li"
              class="nav-item"
              active-class="active">
            <a class="app-nav__link nav-link">Portfolio</a>
          </router-link>
          <router-link to="/stocks"
              tag="li"
              class="nav-item"
              active-class="active">
            <a class="app-nav__link nav-link">Stocks</a>
          </router-link>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="app-nav__link nav-link"
                href="#"
                @click.prevent="endDay">End day</a>
          </li>
          <li class="nav-item dropdown">
            <a class="app-nav__link nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click.prevent="toggleDataDropDown">
              Save & Load
            </a>
            <div class="app-nav__data dropdown-menu"
                aria-labelledby="navbarDropdown"
                v-if="isDataDropdown">
              <a class="dropdown-item"
                  href="#"
                  @click.prevent="saveData">Save data</a>
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
  import { mapState } from 'Vuex'

  export default {
    name: 'app-header',
    computed: {
      ...mapState({
        fund: state => (state.user) ? state.user.fund : 0,
        isDataDropdown: state => state.isDataDropdown
      })
    },
    methods: {
      ...mapMutations([
        'endDay',
        'setDataDropdown'
      ]),
      toggleDataDropDown () {
        if (this.isDataDropdown) {
          this.setDataDropdown(false)
        } else {
          this.setDataDropdown(true)
        }
      },
      saveData () {
        this.$http.post('http://localhost:3000/state/', this.$store.state)
            .then(response => {
              this.toggleDataDropDown()
            }, error => {
              console.log(error.statusText);
            })
      }
    }
  }
</script>

<style lang="scss">
  .app-nav {
    .app-nav__collapse {
      .app-nav__link {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
  }

  .app-nav__data {
    display: block;
  }
</style>
