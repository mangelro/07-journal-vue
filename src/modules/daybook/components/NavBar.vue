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
        
        <a >
            <i>exit_to_app</i>
            <div>logout</div>
        </a>
    </div>
</template>