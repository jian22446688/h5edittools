<template>
    <div class="page-previewpage">
        <div class="page-bg">

        </div>

        <template v-for="elem in elems">
            <div class="page-preview-con" v-if="elem.type === 'text' " >
                <div style="position:absolute;" :style="{
                     zIndex: elem.zindex,
                             top: elem.top+'px',
                             left: elem.left+'px',
                             width: elem.width + 'px',
                             height: elem.height + 'px',
                    fontSize: elem.fontSize + 'px',
                    textAlign: elem.textAlign,}">{{ elem.text }}</div>
            </div>
            <div class="page-preview-con" v-if="elem.type === 'pic' " >
                <div style="position:absolute;" :style="{
                     zIndex: elem.zindex,
                             top: elem.top+'px',
                             left: elem.left+'px',
                             width: elem.width + 'px',
                             height: elem.height + 'px',}">
                    <img :src="host + elem.imgSrc" style="width:100%; height:100%;" alt="">
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import * as config from '@/api/config'
    export default {
        name: "PreviewPage",
        data(){
            return {
                host: config.caryHost + '/',
            }
        },
        props: {
            elems: { type: Array },
            editorElement: { type: Object },
        },
    }
</script>

<style scoped>

    .page-previewpage {
        position: absolute;
        top: 0;
        left: 0;
        width: 380px;
        height: 584px;
        overflow: hidden;
        z-index: 10;

    }

    .page-bg{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
        z-index: 0;
    }

    .page-preview-con {
        position: relative;
    }

</style>
