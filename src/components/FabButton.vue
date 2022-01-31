import { defineAsyncComponent } from '@vue/runtime-core';
<template>
  <button class="fab circle extra">
  <i>{{icon}}</i>
</button>
</template>

<script>
export default {
    props:{
        icon:{
            type:String,
            required:false,
            default:'save'
        }
    }
}
</script>

<style>

</style>