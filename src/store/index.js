import Vue from 'vue'
import Vuex from 'vuex'
import editor from './modules/editor/index'
import user from './modules/user/index'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {
    userinfo: undefined
}

const actions = {
    getUserinfo({commit}){
        commit('getuserinfo', "Cary ing");
    }
}

const mutations = {
    getuserinfo(state, status){
        console.log(status)
        state.userinfo = status;
    }
}

export default new Vuex.Store({
    modules: {
        editor: editor,
        user: user,
    },
    state,
    actions,
    mutations,
    strict: debug
})
