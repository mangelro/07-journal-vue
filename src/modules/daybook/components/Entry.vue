<template>
     <div class="row no-wrap top-align divider entry-container">
            <div class="col min">
              <i class="light-green-text">check_circle</i>
            </div>
            <div class="col">
              <span>{{day}}</span>&nbsp;
              <span>{{month}}</span>&nbsp;
              <span>{{yearDate}}</span>
              <div>Title</div>
              <label>{{shortText}}</label>
            </div>
            <div class="col min">
              <nav>
                <button class="none" @click="$router.push({name:'entry',params:{id:entry.id}})">Ver</button>
              </nav>
            </div>
          </div>
</template>

<script>

import getDayMonthYear from '../helpers/getDayMonthYear'
export default {
  props:{
    entry:{
      type:Object,
      required:true,
    }
  },

  computed:{
    shortText(){
      return this.entry.text.length>130? this.entry.text.substring(0,130)+'...':this.entry.text
    },
    day(){
      const {day} = getDayMonthYear(this.entry.date)
      return day
    },
    month(){
      const {month} = getDayMonthYear(this.entry.date)
      return month
    },
    yearDate(){
      const {year} = getDayMonthYear(this.entry.date)
      return year
    }
  }

}
</script>

<style  lang="scss" scoped>

    .entry-container{
        transition:0.2s all ease-in
    }
    .entry-container:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition:0.2s all ease-in
    }
</style>