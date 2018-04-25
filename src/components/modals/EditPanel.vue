<template>
    <div class="container">
        <div @mousedown.stop="mousedown($event, 'nw')">
            <img src="@/assets/default.png" alt="">
        </div>

        <!--<div @mousedown.stop="mousedown($event, 'nw')">-->
            <!--<img src="@/assets/logo.png" alt="">-->
        <!--</div>-->


        <Picele :element="element"
                :style="{ width:element.width+'px',
                          height:element.height+'px',
                          top:element.top+'px',
                          left:element.left + 'px'}"></Picele>


    </div>
</template>

<script>

    import Picele from '@/components/module/PicElement.vue'

    export default {
        name: "edit-panel",
        components: { Picele },
        props: [],
        data(){
            return {
                element: {
                    left: 0,
                    top: 0,
                    width: 100,
                    height: 100,
                    currentX: 0,
                    currentY: 0,
                    flag: false,
                    scaleFlag: false,
                    direction: '',
                    imgSrc: '@/assets/logo.png'
                }
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {

            mousedown (downEvent, mark) {
                console.log(mark)

                console.log(this.element)

            },
            dragstart (event) {
                console.log('dragstart')
                event.preventDefault()
            },
            onright(){
                console.log("鼠标右键")
            }
        }
    }
</script>

<style scoped>

    .container{
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /*overflow: hidden;*/
        z-index: 10;
    }
    .container img {
        position: absolute;
    }


</style>
