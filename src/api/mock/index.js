const Mock = require('mockjs');
const temp = require('../mockTemp/dataTemplate');
import * as api from '../api'

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

Mock.mock('/api/getThemeList?type=', temp.themeList);
