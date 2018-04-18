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


/**
 * 认证用户是否登录
 */
routerobj.beforeEach((to, from, next) => {
    console.log(to.matched)

    //需要登录验证的路由
    if(to.matched.some(record => record.meta.userAuth)){

    }

    next();
})








routerobj.afterEach((to, from, next)=>{
  iView.LoadingBar.finish();

});



export default routerobj;

// export default new Router({
//   mode: 'history',
//   routes: Routers
// })

// // 对路由进行验证
// if(store.state.isLogin==‘100‘) { // 已经登陆
//     next()   // 正常跳转到你设置好的页面
// }
// else{
//
// // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
//
//     next({path:‘/login‘,query:{ Rurl: to.fullPath} })
// }
// }else{
//     next()
// }
