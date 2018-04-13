const Mock = require('mockjs');
const temp = require('../mockTemp/dataTemplate');
import * as api from '../api'

const getTempobj = (obj) =>{
    return {
        code: 0,
        message: '',
        data: obj,
    }
}

Mock.setup({
  timeout: '200-500'
})

Mock.mock('/api/data', (req, res) => {
    return {
        data: ['a', 'b']
    }
})

Mock.mock('/api/getUserThemeList', {
  'list|1-10': [{
    'id|+1': 1,
    'title|2-6': '@title',
    'description|2-3': '@title',
    'test': {
      'name': 'name'
    }
  }]
})


Mock.mock('/api/gettest', {
  'list|1-20': [
    {
      'color' : '@color',
    }
  ]
})

//获取首页链表
Mock.mock('/api/getThemeList?type=', getTempobj(temp.themeList));

//获取验证码
Mock.mock( /(\/api\/)[\w/]+/, getTempobj({
    img: '@dataImage("122x36",  "@color", "@first")'
}))



