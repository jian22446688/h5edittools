/**
 * Created cary on 18/3/26.
 *
 * 所有的页面路由
 *
 */

const routers = [{
        path: '/',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['@/pages/h5edit/index.vue'], resolve),
        children: [
            {
                path: '/',
                name: "首页-home",
                meta: {
                    title: "首页推荐"
                },
                component: (resolve) => require(['@/pages/h5edit/homePage/home.vue'], resolve),
            },
          {
            path: '/usertheme',
            name: "个人作品-home",
            meta: {
              title: "个人作品"
            },
            component: (resolve) => require(['@/pages/h5edit/homePage/home.vue'], resolve),
          },
            {
                path: '/template',
                name: "首页-template",
                meta: {
                    title: "推荐模板"
                },
                component: (resolve) => require(['@/pages/h5edit/homePage/template.vue'], resolve),
            }
        ]
    },
    {
        path: '/403',
        meta: {
            title: '403-权限不足'
        },
        name: 'error-403',
        component: (resolve) => require(['@/pages/error-page/403.vue'], resolve)
    },
    {
        path: '/500',
        meta: {
            title: '500-服务端错误'
        },
        name: 'error-500',
        component: (resolve) => require(['@/pages/error-page/500.vue'], resolve)
    },
    {
        path: '/*',
        name: 'error-404',
        meta: {
            title: '404-页面不存在'
        },
        component: (resolve) => require(['@/pages/error-page/404.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/'
    },
]
export default routers;
