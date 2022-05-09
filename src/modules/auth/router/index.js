export default {
    name:'auth',
    component: ()=>import(/* webpackChunName:"auth"*/ '../layouts/AuthLayout.vue'),
    children:[
        {
            path:'',
            name:'login',
            component: ()=>import('../views/login.vue'),
        },
        {
            path:'registro',
            name:'registro',
            component: ()=>import('../views/register.vue'),
        }
    ]    
}