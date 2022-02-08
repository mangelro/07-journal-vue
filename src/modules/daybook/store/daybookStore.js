import journalApi from '@/api/journalApi'

export default {

  namespaced: true,

    state:()=>({
      isLoading:true,
      entries:[]
    }),

    mutations:{
      setEntries:(state,entries)=>{
        state.entries=[...state.entries,...entries] //las existentes más las nuevas
        state.isLoading=false
      }

      //updateEntry: (state) =>{}
    },

    actions:{
      loadEntries: async ({commit})=>{
          const {data} = await journalApi.get('/entries.json')

          const entries=[]

          for (let id of Object.keys(data)){
            entries.push({
              id,
              ...data[id]
            })
          }
          commit('setEntries',entries)
      },

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
          return {...entry} //es MUY aconsejable devolver una copia por si se modifica. No modificar el State!!!!!
        }
    }

}