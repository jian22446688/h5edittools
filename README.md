# H5编辑工具

> h5edit tools
> h5edit tools是一个webd端可视化编辑H5页的工具，极大解放生产力也为创意无限的人们提供展示的机会。
市面上类似的工具很多，易企秀、初页、兔展等等，功能很强大，但是作为个人开源项目，h5edit tools的出现不仅是为了做这个可视化工具，更是对自己的一个锻炼，从后端到前端甚至UI，每一行代码累过来，也许粗糙，也许离生产还有段距离，但最大的收获是思路的拓展。
特此感谢：@Gavin 大力帮助
    
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




