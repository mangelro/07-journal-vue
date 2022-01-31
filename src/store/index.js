import { createStore } from 'vuex'

import journal from '../modules/daybook/store/daybookStore'

const store = createStore({

    modules:{
        journal
    }

})


export default store