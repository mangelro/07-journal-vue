<template>
  <div class="row">
    <div class="col s12">
      <div class="field label prefix">
        <i>search</i>
        <input type="text" v-model="term">
        <label>Buscar entrada</label>
      </div>
    </div>
    <div class="col s12">
      <article class="flat medium scroll">
        <header>
          <h5 class="no-margin">Day book entries</h5>
        </header>
         <entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry"></entry>
      </article>
    </div>
  </div>
  <div>
    <button @click="$router.push({name:'entry',params:{id:'new'}})">Nueva entrada</button>
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import {mapGetters} from 'vuex'

export default {
  
	components: { 
    Entry :defineAsyncComponent(()=> import('./Entry.vue'))
	},

	data(){
		return {
			term:''
		}
	},

	computed:{
		/*
		*	Tanto el State y lo Getters son computed
		*/
		...mapGetters('journal',['getEntriesByTerm']),

		entriesByTerm(){
			return this.getEntriesByTerm(this.term) /* Pequeño truco para que un getter acepte parámetros: devolver una función que los acepte */
		}

	},
  mounted(){
		// eslint-disable-next-line no-undef
    this.$nextTick(()=>ui())
    }
  }
</script>
