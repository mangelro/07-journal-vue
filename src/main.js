import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'

import './styles/style.scss'
//import  '../node_modules/beercss/dist/cdn/beer.min.js'

createApp(App)
.use(router)
.use(store)
.mount('#app')
