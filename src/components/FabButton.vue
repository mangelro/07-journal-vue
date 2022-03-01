import { defineAsyncComponent } from '@vue/runtime-core';
<template>
  <button class="fab circle extra" @click="$emit('on:click',$event)">
  <i>{{icon}}</i>
</button>
</template>

<script>
export default {
    props:{
        icon:{
            type:String,
            default:'save'
        }
    },
    emits:['on:click']
}
</script>

<style>

</style>