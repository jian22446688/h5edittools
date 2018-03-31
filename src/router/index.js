import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import Routers from './routers';
import util from '@/utils/util'
Vue.use(iView);
Vue.use(Router)

const RouterConfig = {
  mode: 'history',
  routes: Routers
}
const routerobj = new Router(RouterConfig);

routerobj.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  util.title(to.meta.title);
  next()
});

routerobj.afterEach((to, from, next)=>{
  iView.LoadingBar.finish();

});



export default routerobj;

// export default new Router({
//   mode: 'history',
//   routes: Routers
// })
