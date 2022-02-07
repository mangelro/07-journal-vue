
export default {

  namespaced: true,

    state:()=>({
      isLoading:true,
      entries:[
        {
          id:'1',
          date:new Date().toDateString(),
          text:'Velit facilisi rebum diam ex et invidunt nonumy amet magna lorem tempor amet. Dolore consetetur diam option ut stet. Diam amet aliquyam dolor sed sit et diam dolore justo sit. Et dolore dolor sed clita iusto commodo labore at voluptua enim accusam in. Illum in consequat vero ipsum tempor dolores tempor nulla vel ut. Diam et dolor adipiscing duo. Et erat id dolor hendrerit ipsum sed diam consequat. Qui dolor amet sed. Duis lorem dolor eirmod elitr et ea. Amet et sed facilisi amet erat erat et at elitr eirmod sit nihil et ut dolore. Eum et ut labore diam odio tempor in magna. Dolore amet erat vel amet sanctus lorem sea vero. Dolore duis eu nulla no consetetur facilisis takimata. Ipsum et ipsum vulputate et doming ipsum vel invidunt et sit tempor ea ut vel sit et sed vel. Sit quod no euismod gubergren tempor.',
          picture:null,
        },
        {
          id:'2',
          date:new Date().toDateString(),
          text:'Tincidunt aliquyam elitr diam erat zzril diam gubergren commodo et quis lorem sit facilisis duo. Invidunt rebum enim veniam dolore imperdiet dolores ut ipsum elit rebum. Et et feugiat enim veniam at et lorem in. Sea ut elitr diam ad stet invidunt dolor magna et at dolore nonumy sit vulputate mazim no magna sit. Rebum dolores sit duo invidunt esse sed elitr sanctus accusam ullamcorper sit ipsum. Sanctus no ipsum et aliquyam dolor magna sit duis consetetur ipsum voluptua est velit sed. Et nonumy no. Eum feugait duo vero est sadipscing dolore quod gubergren gubergren eirmod aliquyam nulla diam diam kasd justo dolores. Amet no sanctus blandit takimata magna gubergren dolor vero ea vulputate est ad ipsum sanctus nisl. Aliquyam erat aliquam tempor vel nam feugait velit nibh eos ad dolore dolor. Minim ipsum et gubergren et ut takimata voluptua. Amet nostrud sanctus in et sanctus commodo minim. Aliquip sea aliquyam sadipscing et dolor amet nulla. Stet sit sea ea tempor sed ea et. Sadipscing nulla sed dolor tation iusto amet dolore duis sed erat consequat illum erat facilisis nonumy imperdiet eirmod aliquyam. Commodo gubergren no no rebum iriure magna. Ipsum labore sed nostrud sit sit nulla invidunt amet. Justo takimata sed ut sit velit sed dolor duis. Consequat et ullamcorper et gubergren ut eos luptatum volutpat dolore tempor at dolor dolores sed vero.',
          picture:null,
        },
        {
          id:'3',
          date:new Date().toDateString(),
          text:'Esse illum hendrerit id invidunt sadipscing justo adipiscing adipiscing vero feugait aliquyam aliquyam augue gubergren ipsum eos. Vel nonumy dolores dolores iriure sea. Ut ea vulputate dolores at amet dolore nonumy at illum. At dolor dolores feugiat ipsum. Dolore ipsum elitr erat dolor exerci dolore quod sadipscing vulputate doming sit et duo eirmod. No et consequat sit magna sanctus quod dolor amet. Stet lorem et accusam ullamcorper magna sit esse augue magna luptatum sea. Sanctus kasd in magna clita dolores eros eu sit. Dolore consetetur ad ipsum. Duo et est consetetur clita labore sit diam vero eos magna quis clita quis.',
          picture:null,
        }


      ]
    }),

    mutations:{
      //setEntries:(state)=>{}
      //updateEntry: (state) =>{}
    },

    actions:{
      // loadEntries: ({commit})=>{},

      // updateEntry: ({commit})=>{}


    },

    getters:{

        /*
         * Los getters no son funciones (son propiedades 'get')
         * para aceptar parámetros de entrada hace falta un pequeño
         * truco. El getter no devuelve 'valores' si no que devuelve una
         * función que acepta parámetros
         */

        getEntriesByTerm: (state) => (term='') => 
        {
          if (term.length===0) return state.entries
          
          return state.entries.filter(e=> e.text.toLowerCase().includes(term.toLowerCase()))
        },

        getEntryById: (state) => (id=0) =>
        {
           /*
            * Si lo retornamos directamente estamos devolviento una referencia al State y este puede ser modificado
            * fuera. Solo a traves de mutations se puede modificar el state
            */ 
          //return state.entries.find(e=> e.id===id)


          const entry =  state.entries.find(e=> e.id===id)

          if (!entry) return;
          return {...entry} //es MUY aconsejable devolver una copia por si se modifica no modificar el State!!!!!
        }
    }

}