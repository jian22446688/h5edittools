import Vue from 'vue'
import Router from 'vue-router'
import Routers from './routers';
import util from '@/utils/util'

Vue.use(Router)

const RouterConfig = {
  mode: 'history',
  routes: Routers
}
const routerobj = new Router(RouterConfig);

routerobj.beforeEach((to, from, next) => {
  console.log(to);
  util.title(to.meta.title);
  next()
});

routerobj.afterEach((to, from, next)=>{
  console.log(to)
  
});



export default routerobj;

// export default new Router({
//   mode: 'history',
//   routes: Routers
// })
