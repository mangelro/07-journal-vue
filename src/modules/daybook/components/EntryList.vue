<template>
  <div class="row">
    <div class="col s12">
      <div class="field label prefix">
        <i>search</i>
        <input type="text">
        <label>Buscar entrada</label>
      </div>
    </div>
    <div class="col s12">
      <article class="flat medium scroll">
        <header>
          <h5 class="no-margin">Day book entries</h5>
        </header>

         <entry v-for="item in 100" :key="item"></entry>
      </article>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'

  export default {
  components: { 
    Entry :defineAsyncComponent(()=> import('./Entry.vue'))
    },
    mounted(){
      // eslint-disable-next-line no-undef
      this.$nextTick(()=>ui())
    }
  }
</script>
