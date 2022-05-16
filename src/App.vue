<template>
  <div class="container">
    <h1 v-if="authStatus=='authenticating'">{{authStatus}}</h1>
     <router-view v-else></router-view>

  </div>
  
  
</template>

<script>
import useAuth from './modules/auth/composables/useAuth'
export default {
  setup() {
    
    const {authStatus,checkAuthStatus}=useAuth()

    checkAuthStatus()

    return {
      authStatus
    }

  },
}
</script>