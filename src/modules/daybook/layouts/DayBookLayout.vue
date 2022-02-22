<template>
    <nav-bar></nav-bar>
        <div class="row">
            <div class="col s6">
                <a class="loader medium center-align" v-if="isLoading"></a>
                <entry-list v-else></entry-list>
            </div>
            <div class="col s6">
                <router-view></router-view>
            </div>
        </div>
</template>
<script>
import {defineAsyncComponent } from '@vue/runtime-core'
import {mapActions,mapState} from 'vuex'

export default {
    components:{
        NavBar: defineAsyncComponent(()=>import('../components/NavBar.vue')),
        EntryList: defineAsyncComponent(()=>import('../components/EntryList.vue'))
    },

    created(){
        this.loadEntries()
    },

    computed:{
        // loading(){
        //     return this.$store.state.journal.isLoading
        // }
        ...mapState('journal',['isLoading'])
    },

    methods:{
        ...mapActions('journal',['loadEntries'])
    }

}
</script>