<template>
    <div class="container">

        <div class="page-bg">

        </div>

        <!--<div @mousedown.stop="mousedown($event, 'nw')">-->
            <!--<img src="@/assets/default.png" alt="">-->
        <!--</div>-->

        <!--<div @mousedown.stop="mousedown($event, 'nw')">-->
            <!--<img src="@/assets/logo.png" alt="">-->
        <!--</div>-->


        <!--<Picele :element="element"-->
                <!--:showOperate="true"-->
                <!--:style="{ width:element.width+'px',-->
                          <!--height:element.height+'px',-->
                          <!--top:element.top+'px',-->
                          <!--left:element.left + 'px'}"></Picele>-->


        <template v-for="elem in elems">
           <div @mousedown="selectedEle(elem)">
               <Picele v-if="elem.type === 'pic'"

                       :element="elem"

                       :style="{ width:elem.width+'px',
                          height:elem.height+'px',
                          top:elem.top+'px',
                          left:elem.left + 'px'}"
                       :showOperate="editorElement == elem"
               >

               </Picele>


           </div>
        </template>
    </div>
</template>

<script>

    import Picele from '@/components/module/PicElement.vue'

    import * as config from '@/api/config'

    export default {
        name: "edit-panel",
        components: { Picele },
        props: {
            elems: { type: Array },
            editorElement: { type: Object },
        },
        data(){
            return {
                caryHost: config.caryHost,
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
                    imgSrc: config.caryHost + 'upload/5ad961afefe0e90ca35ffc92/img_b41b68f049df11e89a4e55d3491f4b3f.png'
                }
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            selectedEle(ele){
                console.log(this.editorElement)
                this.$store.commit('SET_CUR_EDITOR_ELEMENT', ele)
            },
            mousedown (downEvent, mark) {
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
    .page-bg{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    }
    .elem {
        position: absolute;
    }
</style>
