import { createStore } from 'vuex'

import journal from '../modules/daybook/store/daybookStore'
import auth  from '../modules/auth/store/authStore'

const store = createStore({

    modules:{
        journal,
        auth
    }

})


export default store