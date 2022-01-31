<template>
     <div class="row no-wrap top-align divider entry-container">
            <div class="col min">
              <i class="light-green-text">check_circle</i>
            </div>
            <div class="col">
              <div>Title</div>
              <label>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis dictum mauris, non interdum dolor. Nunc ut dapibus lorem. Donec congue ullamcorper quam sed tincidunt. Ut vitae nibh nibh. Sed nulla nisi, ultricies a odio vitae, sollicitudin consectetur mauris. Suspendisse facilisis diam sed tempor viverra. Donec ultricies, nisi luctus imperdiet gravida, ex augue maximus quam, a semper urna justo vitae elit. Morbi suscipit ut lacus at tincidunt. In id ornare lorem.</label>
            </div>
            <div class="col min">
              <nav>
                <button class="none" @click="$router.push({name:'entry',params:{id:55}})">Ver</button>

              </nav>
            </div>
          </div>
</template>

<style  lang="scss" scoped>

    .entry-container{
        transition:0.2s all ease-in
    }
    .entry-container:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition:0.2s all ease-in
    }
</style>