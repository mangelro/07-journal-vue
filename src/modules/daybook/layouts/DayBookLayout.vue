<template>
    <nav-bar></nav-bar>
        <div class="row">
            <div class="col s6">
                <entry-list></entry-list>
            </div>
            <div class="col s6">
                <router-view></router-view>
            </div>
        </div>
</template>
<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
    components:{
        NavBar: defineAsyncComponent(()=>import('../components/NavBar.vue')),
        EntryList: defineAsyncComponent(()=>import('../components/EntryList.vue'))
    }
}
</script>