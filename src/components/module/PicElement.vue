<template>
    <div class="wrap"  @mousedown="mousedown" @mouseup="mouseup">
        <img  @dragstart="$event.preventDefault()" :src="host+element.imgSrc" style="width:100%; height:100%;">
        <Operate v-show="showOperate"
                 @mousedown.native.stop="scaleMousedown"
                 @mouseup.native.stop="scaleMouseup"
                 @mousemove.native.stop="scaleMousemove"/>
    </div>
</template>

<script>
    import Operate from '@/components/module/Operate.vue'
    import * as config from '@/api/config'
    export default {
        name: "pic-element",
        components: { Operate },
        props: {
            element: {
                type: Object,
                request: true
            },
            showOperate: {
                type: Boolean,
            }
        },
        data() {
            return {
                left: 0,
                top: 0,
                widht: 0,
                height: 0,
                curX: 0,
                curY: 0,
                flag: false,
                scaleFlag: false,
                dirrection: '',
                host: config.caryHost,
                imgsrc: '../../assets/logo.png'
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            move(){
                document.querySelector('.editor').onmousemove = (event) => {
                    var e = event || window.event
                    if(this.flag){
                        let nowX = e.clientX
                        let nowY = e.clientY
                        let disX = nowX - this.curX
                        let disY = nowY - this.curY
                        this.element.top = parseInt(this.top) + disY
                        this.element.left = parseInt(this.left) + disX
                    }
                }
            },

            // 处理元素伸缩
            scaleMousemove () {
                document.querySelector('.editor').onmouseup = (event) => {
                    this.scaleFlag = false
                }
                document.querySelector('.editor').onmousemove = (event) => {
                    var e = event || window.event
                    if (this.scaleFlag) {
                        let nowX = e.clientX
                        let nowY = e.clientY
                        let disX = nowX - this.curX
                        let disY = nowY - this.curY
                        switch (this.direction) {
                            // 左边
                            case 'w':
                                this.element.width = parseInt(this.width) - disX
                                this.element.left = parseInt(this.left) + disX
                                break
                            // 右边
                            case 'e':
                                this.element.width = parseInt(this.width) + disX
                                break
                            // 上边
                            case 'n':
                                this.element.height = parseInt(this.height) - disY
                                this.element.top = parseInt(this.top) + disY
                                break
                            // 下边
                            case 's':
                                this.element.height = parseInt(this.height) + disY
                                break
                            // 左上
                            case 'nw':
                                this.element.width = parseInt(this.width) - disX
                                this.element.left = parseInt(this.left) + disX
                                this.element.height = parseInt(this.height) - disY
                                this.element.top = parseInt(this.top) + disY
                                break
                            // 左下
                            case 'sw':
                                this.element.width = parseInt(this.width) - disX
                                this.element.left = parseInt(this.left) + disX
                                this.element.height = parseInt(this.height) + disY
                                break
                            // 右上
                            case 'ne':
                                this.element.height = parseInt(this.height) - disY
                                this.element.top = parseInt(this.top) + disY
                                this.element.width = parseInt(this.width) + disX
                                break
                            // 右下
                            case 'se':
                                this.element.height = parseInt(this.height) + disY
                                this.element.width = parseInt(this.width) + disX
                                break
                        }
                        console.log(this.element.width)
                    }
                }
            },
            mousedown (e) {
                console.log('鼠标按下')
                if(e.button === 2)return
                this.flag = true
                this.curX = e.clientX
                this.curY = e.clientY
                this.top = this.element.top
                this.left = this.element.left
                this.move()
            },
            mouseup (e) {
                this.flag = false
                this.scaleFlag = false
            },
            scaleMousedown (e) {
                this.scaleFlag = true
                this.curX = e.clientX
                this.curY = e.clientY
                this.top = this.element.top
                this.left = this.element.left
                this.width = this.element.width
                this.height = this.element.height
                this.direction = e.target.getAttribute('data-direction')
                this.scaleMousemove()
            },

            scaleMouseup (e) {
                this.scaleFlag = false
            },
            dragstart (event) {
                console.log('dragstart')
                event.preventDefault()

            }
        }
    }
</script>

<style scoped>
    .wrap{
        position: absolute;
        cursor: move;
    }
    .wrap img {
        position: absolute;
        user-select: none;
    }
</style>
