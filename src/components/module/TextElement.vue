<template>
    <div class="element" @mousedown="mousedown">
        <Operate class="operate" v-show="element === curEle" :element="element" />

        <div :class="element['playing'] && 'animated ' + this.element['animatedName']"  :style="styleBoder">
            <div class="content ">
                <div :style="styleBasic">{{ element.text }}</div>
            </div>
        </div>

    </div>
</template>

<script>
    import Operate from '@/components/module/OperateText.vue'

    export default {
        name: "TextElement",
        components: {
            Operate
        },
        props: ['element'],

        computed: {
            curEle(){
                return this.$store.state.editor.editorElement
            },

            styleAnim(){
                return {
                    animationIterationCount: this.element.loop ? 'infinite' : 'initial',
                    animationDuration:       this.element.duration + 's',
                    animationDelay:          this.element.delay + 's'
                }
            },

            styleBasic () {
                return {
                    lineHeight:     this.element['lineHeight'],
                    color:          this.element['color'],
                    textAlign:      this.element['textAlign'],
                    fontSize:       this.element['fontSize'] + 'px',
                    fontWeight:     this.element['fontWeight'],
                    fontFamily:     this.element['fontFamily'],
                    opacity:        this.element['opacity'] / 100,
                }
            },

            styleBoder () {
                return {
                    backgroundColor:         this.element.bgColor,
                    opacity:                 this.element.opacity / 100,
                    borderStyle:             this.element.borderStyle,
                    borderColor:             this.element.borderColor,
                    borderWidth:             this.element.borderWidth + 'px',
                    borderRadius:            this.element.borderRadius + 'px',
                    boxShadow:               `${this.element.boxShadow_h}px ${this.element.boxShadow_v}px ${this.element.boxShadow_sp}px ${this.element.boxShadow_color}`,
                    animationIterationCount: this.element.loop ? 'infinite' : 'initial',
                    animationDuration:       this.element.duration + 's',
                    animationDelay:          this.element.delay + 's',
                }
            }
        },
        methods: {
            mousedown(downEvent) {
                let ele = this.element
                let startY = downEvent.clientY
                let startX = downEvent.clientX
                let startTop = ele['top']
                let startLeft = ele['left']
                let move = moveEvent => {
                    let currX = moveEvent.clientX
                    let currY = moveEvent.clientY
                    ele['top'] = currY - startY + startTop
                    ele['left'] = currX - startX + startLeft
                }
                let up = () => {
                    document.removeEventListener('mousemove', move)
                    document.removeEventListener('mouseup', up)
                }
                document.addEventListener('mousemove', move)
                document.addEventListener('mouseup', up)
            },



        }
    }
</script>

<style scoped>

    .element {
        position: absolute;
        cursor: move;
    }

    .operate {
        z-index: 2;
    }

    .content {
        width: 100%;
        height: 100%;
        white-space: pre-wrap;
        word-wrap: break-word;
        position: relative;
        z-index: 1;
    }

</style>
