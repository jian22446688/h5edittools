export default class Element {
    constructor (ele = {}){
        this.type           = ele.type || 'pic'
        this.imgSrc         = ele.imgSrc || ''
        this.left           = ele.left || 0
        this.top            = ele.top || 0
        this.width          = ele.width || 0
        this.height         = ele.height || 0
        this.lineHeight     = ele.lineHeight || 0
        this.animatedName   = ele.animatedName || ''
        this.duration       = ele.duration || 1     // 动画时长
        this.delay          = ele.delay || 0        // 动画延时
        this.playing        = false                 // 动画是否播放中
        this.loop           = false                 // 动画是否循环
        this.count          = 0                     // 动画播放次数
        this.opacity        = ele.opacity || 100
        this.transform      = ele.transform || 0
        this.text           = ele.text || '请输入文字'
        this.textAlign      = ele.textAlign || 'left'
        this.iconKey        = ele.iconKey || ''
        this.bg             = ele.bg || ''
        this.fontSize       = ele.fontSize || 18
        this.fontFamily     = ele.fontFamily || '微软雅黑'
        this.fontWeight     = ele.fontWeight || 'normal'
        this.color          = ele.color || 'rgb(00, 00, 00)'
        this.zindex         = ele.zindex || 1
        this.borderStyle    = ele.borderStyle || ''
        this.borderWidth    = ele.borderWidth || 3
        this.borderColor    = ele.borderColor || 'rgb(00, 00, 00)'
        this.borderRadius   = ele.borderRadius || 0
        this.boxShadow_h    = ele.boxShadow_h || 0
        this.boxShadow_v    = ele.boxShadow_v || 0
        this.boxShadow_sp   = ele.boxShadow_sp || 0                                 // 距离
        this.boxShadow_color= ele.boxShadow_color || 'rgba(00, 00, 00, 0.5)'        // 颜色
        this.bgColor        = ele.bgColor || 'rgba(00, 00, 00, 00)'                 // 颜色
    }

}
