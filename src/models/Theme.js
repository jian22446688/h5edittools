export default class Theme {
  constructor(theme ={}){
    this.userId = theme.userId
    this.title = theme.title || '标题'
    this.description = theme.description || '描述'
    this.pages = theme.pages || []
    this.type = theme.type || 'h5'
    this.canvasHeight = theme.canvasHeight || 504
    this.themebg = theme.themebg || 'upload/all/img_default.png'
    this.status = theme.status || '0' // 0 为保存 1 为发布
  }
}
