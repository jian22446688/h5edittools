import Vue from 'vue'
import Vuex from 'vuex'
import editor from './modules/editor/index'
import user from './modules/user/index'
import router from '@/router/index'
import * as url from '../api/urls';

import Message from 'iview/src/components/Message'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        editor: editor,
        user: user,
    },
    strict: false
})

store.mag = Message


export default store ;
