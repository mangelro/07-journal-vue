


export default {
    name:'daybook',
    component: ()=>import(/* webpackChunName:"daybook"*/ '../layouts/DayBookLayout.vue'),
    children:[
        {
            path:'',
            name:'no-entry',
            component: ()=>import('../views/NoEntrySelected.vue'),

          
        },
        {
            path:':id',
            name:'entry',
            component: ()=>import('../views/EntryView.vue'),
              
            //Esto se realiza cuando la ruta se crea NO cuando se cambia de ruta
            props: (router)=>{
                return {
                    id:router.params.id                        
                }
            }
        }
    ]    
}