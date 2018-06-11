# H5编辑工具

> h5edit tools
> h5edit tools是一个webd端可视化编辑H5页的工具，极大解放生产力也为创意无限的人们提供展示的机会。
市面上类似的工具很多，易企秀、初页、兔展等等，功能很强大，但是作为个人开源项目，h5edit tools的出现不仅是为了做这个可视化工具，更是对自己的一个锻炼，从后端到前端甚至UI，每一行代码累过来，也许粗糙，也许离生产还有段距离，但最大的收获是思路的拓展。
特此感谢：@Gavin 大力帮助 
#### 三、总结
  h5edit tools 开发时间比较短，功能并不是很丰富，但是麻雀虽小、五脏俱全，基本功能都是具备的。由于h5edit tools是本人独立开发，由于技术有限难免会有些处理不好的地方，或者一些很明显的bug（虽然我也在不断的改善），如果您发现了问题，请您不佞赐教，如果确实存在问题，我会不断的更新上去，这也是开源的目的之所在。如果您有更好的解决方案或者对h5edit tools有更好的想法，也可以通过我的博客联系我，让我们一起探讨，共同进步。
    
## 本项目源代码
* 源代码

        
    ```
     git clone https://github.com/jian22446688/h5edittools
    ```
* 安装本项目依赖包

    ```
    npm install
    ```
* 启动MongoDB服务

    ```
    mongod --dbpath ~/data/db
    ```
* 启动项目
    
    ```
    npm run dev
    ```
* 启动服务器
    
    ```
    需要安装 node-dev 
    
    # node-dev ./bin/www
    npm run runserver  
    ```

* 打开浏览器
    
    ```
    http://localhost:8080
    ```
客服端和服务器在一个项目里

## 使用框架

* VUE 2.0
* UI 框架 iview
* MongoDB
* Express
    
    
## 项目目录文件

```
├── README.md
├── build
├── config
│ 
├── favicon.ico
├── index.html
├── package-lock.json
├── package.json
├── server  // 服务器目录
│   ├── app.js
│   ├── bin
│   │   └── www
│   ├── db
│   ├── models
│   │   ├── edit
│   │   └── user
│   ├── routes
│   │   ├── api
│   │   ├── index.js
│   │   ├── users.js
│   │   └── verify
│   └── utils
├── src
│   ├── App.vue
│   ├── api
│   │   ├── api.js
│   │   ├── mock
│   │   ├── mockTemp
│   │   └── urls.js
│   ├── assets
│   │   ├── 001
│   │   ├── default.png
│   │   ├── demo
│   │   ├── lib
│   │   ├── logo-min.jpg
│   │   ├── logo.jpg
│   │   └── logo.png
│   ├── components
│   │   ├── HelloWorld.vue
│   │   ├── modals
│   │   ├── module
│   │   ├── plugin
│   │   └── property
│   ├── main.js
│   ├── models   //数据模型文件
│   │   ├── Element.js
│   │   ├── Page.js
│   │   ├── Theme.js
│   │   └── animateName.js
│   ├── pages
│   │   ├── admin
│   │   ├── error-page
│   │   └── h5edit
│   ├── router
│   │   ├── index.js
│   │   └── routers.js
│   ├── store
│   │   ├── index.js
│   │   ├── modules
│   │   └── mutation-types.js
│   ├── styles
│   │   └── app.less
│   └── utils
│       ├── http.js
│       └── util.js
├── static
└── test
    
    
    
```


## 项目状态

*  使用 服务端session 客户端localStorage 保持用户登录状态

*  2018-4-25 更新服务器 
    
    使用 multer 上传图片 单文件上传，多文件上传 
   
    使用 node-uuidv1 不重复文件命名   
      
    更新前端页面 首页用户发布的作品列表和个人作品
    
*   2018-5-3 更新前端控制界面
    
    添加画布右键菜单
    
    添加了元素右键 复制、删除、置于顶层、上移一层，下移一层、置于底层
    
    添加了不同组件属性控制 BaseEditPlan
    
    添加 文本控制组件
    添加 图片控制组件
    
*   至 5-16 事件耽误没有做了。。。。
     
*   5-20 更新了发布查看h5页面 

*   5-21 更新了 可以打包下载制作完成的h5页面

*   使用pm2 + nginx 服务器部署  

*   今天6-11才部署服务器完成，中间也遇到很多问题，但是都迎刃而解    


## 项目截图

    
![Alt text](https://github.com/jian22446688/h5edittools/blob/c219173fe21dc7baf0db9bb7bad9a6819647cd58/screen-cap/1.png?raw=true)

![Alt text](https://github.com/jian22446688/h5edittools/blob/c219173fe21dc7baf0db9bb7bad9a6819647cd58/screen-cap/2.png?raw=true)

![Alt text](https://github.com/jian22446688/h5edittools/blob/c219173fe21dc7baf0db9bb7bad9a6819647cd58/screen-cap/4.png?raw=true)

![Alt text](https://github.com/jian22446688/h5edittools/blob/c219173fe21dc7baf0db9bb7bad9a6819647cd58/screen-cap/5.png?raw=true)

![Alt text](https://github.com/jian22446688/h5edittools/blob/c219173fe21dc7baf0db9bb7bad9a6819647cd58/screen-cap/6.png?raw=true)

![Alt text](https://github.com/jian22446688/h5edittools/blob/c219173fe21dc7baf0db9bb7bad9a6819647cd58/screen-cap/7.png?raw=true)

![Alt text](https://github.com/jian22446688/h5edittools/blob/c219173fe21dc7baf0db9bb7bad9a6819647cd58/screen-cap/8.png?raw=true)
    


## 启动项目 
自带发布方法

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```




