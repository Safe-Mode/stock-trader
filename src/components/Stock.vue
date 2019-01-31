<template lang="html">
  <article class="stock card bg-light mb-3 border-0 shadow">
    <header class="card-header"
        :class="isUser ? 'bg-primary' : 'bg-success'">
      <h5 class="card-title text-white mb-0">
        {{ stock.title }}
        <span class="stock__info">
          ( Price: {{ stock.price }}
          <template v-if="stock.quantity">| {{ stock.quantity }}</template> )
        </span>
      </h5>
    </header>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col">
            <input type="number"
                class="form-control"
                placeholder="Quantity">
          </div>
          <div class="col">
            <button type="submit"
                class="btn"
                :class="isUser ? 'btn-danger' : 'btn-success'">
              <slot></slot>
            </button>
          </div>
        </div>
      </form>
    </div>
  </article>
</template>

<script>
  export default {
    props: [
      'stock',
      'isUser'
    ]
  }
</script>

<style lang="css">
  .stock__info {
    font-size: 14px;
  }
</style>
