<template>
<article class="border no-padding left-align top-align">
  <div class="padding">
    <h5>Day book</h5>
    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus labore, velit magnam, minima rem animi itaque in laborum optio quas voluptate praesentium sint error vero quasi officiis impedit quae a!</div>
  </div>
</article>
<nav>
<button class="pink small"><i>delete</i><span>Borrar</span></button>
<button class="small"><i>send</i><span>Subir todo</span></button>
</nav>

<div class="field textarea label border small">
  <textarea></textarea>
  <label>¿Qué sucedió hoy?</label>
</div>
<fab-button></fab-button>

</template>
<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
    components:{
      FabButton: defineAsyncComponent(()=>import('@/components/FabButton'))
    },

    mounted(){
      // eslint-disable-next-line no-undef
      this.$nextTick(()=>ui())
    }

}
</script>

<style lang="scss" scoped>

 button.fab{
    position:fixed;
    bottom:120px;
    right:120px;
  }

</style>