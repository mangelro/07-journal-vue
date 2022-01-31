
export default {

    namespaced:true,

    state:()=>({
      isLoading:true,
      entries:[
        {
          id:new Date().getTime(),
          date:new Date().toDateString(),
          text:'lorem ipsum',
          picture:null,
        },
        {
          id:new Date().getTime()+1000,
          date:new Date().toDateString(),
          text:'lorem ipsum',
          picture:null,
        },
        {
          id:new Date().getTime()+2000,
          date:new Date().toDateString(),
          text:'lorem ipsum',
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
        //getEntriesByTerm: ({commit})=>{}
    }

}