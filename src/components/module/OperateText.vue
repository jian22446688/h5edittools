<template>
    <div class="operate">
        <div class="scale scale-nw" @mousedown.stop="mousedown($event, 'nw')"></div>
        <div class="scale scale-ne" @mousedown.stop="mousedown($event, 'ne')"></div>
        <div class="scale scale-sw" @mousedown.stop="mousedown($event, 'sw')"></div>
        <div class="scale scale-se" @mousedown.stop="mousedown($event, 'se')"></div>
        <div class="scale scale-n" @mousedown.stop="mousedown($event, 'n')"></div>
        <div class="scale scale-e" @mousedown.stop="mousedown($event, 'e')"></div>
        <div class="scale scale-s" @mousedown.stop="mousedown($event, 's')"></div>
        <div class="scale scale-w" @mousedown.stop="mousedown($event, 'w')"></div>
    </div>
</template>

<script>
    export default {
        props: ['element'],
        methods: {
            mousedown (downEvent, mark) {
                let startX = downEvent.clientX
                let startY = downEvent.clientY
                let ele = this.element
                let height = ele['height']
                let width = ele['width']
                let top = ele['top']
                let left = ele['left']
                console.log(downEvent.target)
                let move = moveEvent => {
                    let currX = moveEvent.clientX
                    let currY = moveEvent.clientY
                    let disY = currY - startY
                    let disX = currX - startX
                    switch (mark) {
                        // 左边
                        case 'w':
                            if((parseInt(width) - disX) >= 10){
                                ele['width'] = parseInt(width) - disX
                                ele['left'] = parseInt(left) + disX
                            }
                            break
                        // 右边
                        case 'e':
                            if((parseInt(width) + disX) >= 1)
                                ele['width'] = parseInt(width) + disX
                            break
                        // 上边
                        case 'n':
                            if((parseInt(height) - disY) >= 1){
                                ele['top'] = parseInt(top) + disY
                                ele['height'] = parseInt(height) - disY
                            }
                            break
                        // 下边
                        case 's':
                            if((parseInt(height) + disY) >= 1)
                                ele['height'] = parseInt(height) + disY
                            break
                        // 左上
                        case 'nw':
                            if((parseInt(height) - disY) >= 3 && (parseInt(width) - disX) >= 3){
                                ele['width'] = parseInt(width) - disX
                                ele['left'] = parseInt(left) + disX
                                ele['height'] = parseInt(height) - disY
                                ele['top'] = parseInt(top) + disY
                            }
                            break
                        // 左下
                        case 'sw':
                            if((parseInt(height) + disY) >= 3 && (parseInt(width) - disX) >= 3){
                                ele['width'] = parseInt(width) - disX
                                ele['left'] = parseInt(left) + disX
                                ele['height'] = parseInt(height) + disY
                            }
                            break
                        // 右上
                        case 'ne':
                            if((parseInt(height) - disY) >= 3 && (parseInt(width) + disX) >= 3){
                                ele['height'] = parseInt(height) - disY
                                ele['top'] = parseInt(top) + disY
                                ele['width'] = parseInt(width) + disX
                            }
                            break
                        // 右下
                        case 'se':
                            if((parseInt(height) + disY) >= 3){
                                ele['height'] = parseInt(height) + disY
                                ele['width'] = parseInt(width) + disX
                            }
                            break
                    }
                }
                let up = () => {
                    document.removeEventListener('mousemove', move)
                    document.removeEventListener('mouseup', up)
                }
                document.addEventListener('mousemove', move)
                document.addEventListener('mouseup', up)
            }
        }
    }
</script>
<style scoped>
    .operate {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px dashed #000;
    }

    .scale {
        position: absolute;
        background: #fff;
        border: 1px solid #000;
        width: 7px;
        height: 7px;
        z-index: 1;
    }

    .scale-nw {
        top: -3.5px;
        left: -3.5px;
        cursor: nw-resize;
        border-radius: 50%;
    }

    .scale-ne {
        top: -3.5px;
        right: -3.5px;
        cursor: ne-resize;
        border-radius: 50%;
    }

    .scale-sw {
        bottom: -3.5px;
        left: -3.5px;
        cursor: sw-resize;
        border-radius: 50%;
    }

    .scale-se {
        bottom: -3.5px;
        right: -3.5px;
        cursor: se-resize;
        border-radius: 50%;
    }

    .scale-n {
        top: -3.5px;
        left: 50%;
        margin-left: -3.5px;
        cursor: n-resize;
    }

    .scale-e {
        right: -3px;
        top: 50%;
        margin-top: -3.5px;
        cursor: e-resize;
    }

    .scale-s {
        bottom: -3px;
        left: 50%;
        margin-left: -3.5px;
        cursor: s-resize;
    }

    .scale-w {
        left: -3.5px;
        top: 50%;
        margin-top: -3.5px;
        cursor: w-resize;
    }
</style>
