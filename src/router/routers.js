/**
 * Created cary on 18/3/26.
 * 
 * 所有的页面路由
 * 
 */

const routers = [
    {
        path: '/',
        name: "首页",
        meta: {
            title: '首页'
        },
        component: (resolve) =>require(['@/pages/h5edit/index.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/'
    }
]




export default routers;