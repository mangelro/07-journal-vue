<template>
    <h2>Home</h2>
    <button @click="goToDayBook">Day Book</button>
</template>

<script>
export default {
    
    methods:{
        goToDayBook(){
            this.$router.push({name:'no-entry'})
        }
    }
}
</script>

