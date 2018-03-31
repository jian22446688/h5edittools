import Vue from 'vue'
import Vuex from 'vuex'
import editor from './modules/editor/index'



Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
     editor: editor,
  },


  strict: debug
})
