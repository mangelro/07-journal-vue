<template>
	<template v-if="entry">
    <div class="row">
      <div class="col s12">
        <article class="border no-padding left-align top-align">
          <div class="padding">
            <h5>Day book</h5>
            <span>{{ day }}</span
            >&nbsp; <span>{{ month }}</span
            >&nbsp;
            <span>{{ yearDate }}</span>
          </div>

          <nav>
            <input type="file" @change="onSelectedImage" ref="fileInput" v-show="false" accept="image/png,image/jpeg">
            <button class="pink small" @click="onDeleteEntry" v-if="entry.id"><i>delete</i><span>Borrar</span></button>
            <button class="small"  @click="onSelectImage"><i>send</i><span>Subir todo</span></button>
          </nav>
        </article>
    </div>


      <div class="col s12">
        <div class="field textarea label border">
          <textarea v-model="entry.text"></textarea>
          <label>¿Qué sucedió hoy?</label>
        </div>
          <img :src="localImage" v-if="localImage" class="responsive small"> 
        <img :src="entry.picture" v-if="entry.picture" class="responsive small">
      </div>
    </div>
	</template>
	<fab-button icon="save" @on:click="saveEntry"></fab-button>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters,mapActions } from "vuex"; //computed !!!
import Swal from 'sweetalert2'
import getDayMonthYear from "../../daybook/helpers/getDayMonthYear"

import uploadImage from '../helpers/uploadImage'

export default {
  name:'EntryView',
  components: {
    FabButton: defineAsyncComponent(() => import("@/components/FabButton"))
    
  },
  props: {
    /*
     * Es más interesante colocar los parámetros de las url´s como props
     * para acerlas mas evidentes.
     * Se cargan desde el router a través del props, 
     * 
     */
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      entry: null,
      localImage:null,
      file:null,
    };
  },

  computed: {
    ...mapGetters("journal", ["getEntryById"]),

    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDate() {
      const { year } = getDayMonthYear(this.entry.date);
      return year;
    },
  },

  methods: {

    ...mapActions('journal',['updateEntry','createNewEntry','deleteEntry']),

    loadEntry() {

      let entry

      if (this.id==='new')
      {
        entry={
          text:'',
          date:new Date().getTime()
        }
      }
      else{
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }

      this.entry = entry;
    },
    
    async saveEntry(){

      // new Swal({
      //   title:'Espere, por favor.',
      //   allowOutsideClick:false,
      // })
      
      Swal.showLoading()
      
      const picture =await uploadImage(this.file)

      this.entry.picture=picture

      if(this.entry.id)
      {
        await this.updateEntry(this.entry)
      }
      else
      {
        const id= await this.createNewEntry(this.entry)
        this.$router.push({name:'entry',params:{id}})
      }

      this.file=null
      this.localImage=null
      Swal.fire('Guardado','Entrada reagistrada correctamente','success')
    },

    async onDeleteEntry(){

      //   const {isConfirmed}=await Swal.fire({
      //     title:'Esta seguro',
      //     text:'Una vez borrado no se puede recuperar',
      //     showDenyButton:true
      //   })

      // console.log(result)

        // if (result){
          const {id}= this.entry
          await this.deleteEntry(id)

          this.$router.push({name:'no-entry'})
        // }
    },

    onSelectedImage(event){
      const file=event.target.files[0]

      if (!file){
        this.localImage=null
        this.file=null
        return
      }

      this.file=file
      const fr=new FileReader()
      fr.onload= () => this.localImage=fr.result
      fr.readAsDataURL(file)


    },

    onSelectImage(){
      this.$refs.fileInput.click()
        
    }
  },

  created() {
    this.loadEntry();
  },

  mounted() {
    // eslint-disable-next-line no-undef
    this.$nextTick(() => ui());
  },

  watch: {
    id() {
      //console.log(value,oldValue)
      this.loadEntry();
    },
  },
}
</script>

<style lang="scss" scoped>
button.fab {
  position: fixed;
  bottom: 120px;
  right: 120px;
}
</style>