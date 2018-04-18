const Mock = require('mockjs');
const temp = {}

temp.userThemeList = {
  'title|6'       : '&',
  'description'   : '&',
  'pages'         : '&',
  'type'          : '&',
  'canvasHeight'  : '&',
}
// Mock.Random.dataImage('200', Mock.mock({'regexp': /\w{4}/}).regexp)
temp.themeList = {
  'list|3-13': [{
    'userId'        : '@id',
    'title'         : '@ctitle(4, 8)',
    'description'   : '@cparagraph(1, 3)',
    'type'          : '@pick(["h5", ""])',
    'canvasHeight'  : 504,
    'themebg'       : '@image("200x200", "@color", "@first")',
    'status'        : 0, // 0 草稿； 1 发布；
    'createTime'    : '@datetime',
    'saveTime'      : '@now',
    'buildTime'     : '@now',
    'pages|6-20'    :[{
      'id|+1': 1,
      'type': 'pic',
      'imgSrc': Mock.Random.image("600x600", "@color", "@first"),
      'left|1-100.1-10': 0,
      'top|1-100.1-10': 0,
      'width|1-100.1-10': 0,
      'height|1-100.1-10': 0,
      'lineHeight|12-46': 0,
      'animatedName': '',
      'duration|2': 1,
      'delay|2': 0,
      'playing': false,
      'loop': false,
      'opacity|100': 100,
      'transform|5': 0,
      'text': '@first',
      'textAlign|': 'left',
      'iconKey': '',
      'bg': '',
      'fontSize|16': 18,
      'fontFamily': '微软雅黑',
      'fontWeight':  'normal',
      'color': '#000000',
      'zindex': 1,
    }],
  }]
}



module.exports = temp;
