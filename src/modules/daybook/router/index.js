


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
            path:':id(\\d+)',
            name:'entry',
            component: ()=>import('../views/EntryView.vue'),
            //De esta form se hace más evidente el id necesario en el componente,
            props: (router)=>{
                return {
                    id:router.params.id                        
                }
            }
        }
    ]    
}