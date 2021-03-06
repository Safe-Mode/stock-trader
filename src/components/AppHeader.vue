<template>
  <header class="app-header my-4">
    <nav class="app-nav navbar navbar-expand-md navbar-light bg-light">
      <router-link to="/"
          class="navbar-brand"
          exact>Stock Trader</router-link>
      <button class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="app-nav__collapse collapse navbar-collapse"
          id="navbarSupportedContent"
          :class="{ 'show': isMenuShown }">
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
                @click.prevent="END_DAY">End day</a>
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
                  href="#"
                  @click.prevent="loadData">Load data</a>
            </div>
          </li>
        </ul>

        <b class="navbar-text">
          <span>Funds:</span>
          <span>{{ animatedFund | currency }}</span>
        </b>
      </div>
    </nav>
  </header>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'Vuex'
  import { TweenMax } from 'gsap/TweenMax'
  import { DURATION_TRANSITION_STATE } from '../util'


  export default {
    name: 'app-header',
    data () {
      return {
        stateURL: 'state.json',
        tweenedFund: 0,
        collapsed: true
      }
    },
    computed: {
      ...mapState({
        fund: state => (state.user.fund) ? state.user.fund : 0,
        isDataDropdown: state => state.isDataDropdown
      }),
      animatedFund () {
        return this.tweenedFund.toFixed(0)
      },
      isMenuShown () {
        return !this.collapsed && window.screen.width < 768
      }
    },
    methods: {
      ...mapMutations([
        'END_DAY',
        'SET_DATA_DROPDOWN'
      ]),
      ...mapActions([
        'fetchData'
      ]),
      toggleDataDropDown () {
        if (this.isDataDropdown) {
          this.SET_DATA_DROPDOWN(false)
        } else {
          this.SET_DATA_DROPDOWN(true)
        }
      },
      saveData () {
        this.$http.put(this.stateURL, {
          user: this.$root.$store.state.user,
          stocks: this.$root.$store.state.stocks
        })
            .then(response => {
              this.toggleDataDropDown()
            }, error => {
              console.log(error.statusText);
            })
      },
      loadData () {
        new Promise((resolve) => {
          resolve(this.fetchData(this.stateURL))
        }).then(() => {
          this.toggleDataDropDown()
        })
      },
      toggleMenu () {
        const menuHeight = (this.collapsed) ? 200 : 0
        const isOpen = this.collapsed

        this.collapsed = (isOpen) ? !this.collapsed : this.collapsed

        TweenLite.to('#navbarSupportedContent', DURATION_TRANSITION_STATE, {
          height: menuHeight,
          onComplete: () => {
            this.collapsed = (!isOpen) ? !this.collapsed : this.collapsed
            document.querySelector('#navbarSupportedContent').style.height = (!isOpen) ? 0 : 'auto'
          }
        })
      }
    },
    watch: {
      fund (newVal) {
        TweenLite.to(this.$data, DURATION_TRANSITION_STATE, { tweenedFund: newVal })
      }
    }
  }
</script>

<style lang="scss">
  .app-nav {
    .app-nav__collapse {
      @media (max-width: 767px) {
        overflow: hidden;
        height: 0;
      }

      .app-nav__data {
        @media (max-width: 767px) {
          position: absolute;
          top: auto;
          bottom: 100%;
        }
      }

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
