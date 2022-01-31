

export default {
    name:'daybook',
    component: ()=>import(/* webpackChunName:"daybook"*/ '../layouts/DayBookLayout.vue'),
    children:[
        {
            path:'',
            name:'no-entry',
            component: ()=>import('../views/NoEntrySelected.vue')
        },
        {
            path:':id',
            name:'entry',
            component: ()=>import('../views/EntryView.vue')
        }
    ]    
}