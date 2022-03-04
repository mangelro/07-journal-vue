<template>
<article class="border large no-padding center-align middle-align">
  <div class="padding">
    <h5>Day book</h5>
    <div>No hay nada seleccionado</div>
  </div>
</article>
<fab-button icon="add" @on:click="createNewEntry"></fab-button>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
    name:'NoEntrySelected',
    components:{
      FabButton: defineAsyncComponent(()=>import('@/components/FabButton'))
    },
    methods:{
      async createNewEntry(){
        this.$router.push({name:'entry', params:{id:'new'}})
      }
    }

}
</script>

<style lang="scss" scoped>

  button{
    position:fixed;
    bottom:120px;
    right:120px;
  }

</style>