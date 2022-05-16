<template>
    <div class="menu top m l">
        <img src="/favicon.ico" class="circle small-margin">
        <router-link :to="{name:'home'}">
            <i>home</i>
            <div>Home</div>
        </router-link>
        
        <router-link :to="{name:'no-entry'}">
            <i>book</i>
            <div>Day book</div>
        </router-link>
        
        <a @click="onLogout" >
            <i>exit_to_app</i>
            <div>{{userName}}</div>
        </a>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'
import useAuth from '../../auth/composables/useAuth'

export default {
    setup() {
        const {userName, logout }=useAuth()

        const router = useRouter();

    return {
        userName,
        onLogout : ()=>{
            router.push({name:'login'})
            logout();

        }
    }

    },
}
</script>