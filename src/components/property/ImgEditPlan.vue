<template>
    <div style="width: 100%;">
        <BaseEdit :elems="elems">

            <Panel name="1">
                图片属性
                <template slot="content">
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">图片</Col>
                        <Col span="16">
                            <Row>
                                <Col span="12" class="p-img-icon">
                                    <img style="margin: 0 auto" :src="caryHost+elems.imgSrc" alt="" height="100%">
                                </Col>
                                <Col span="12" style="line-height: 80px;">
                                    <Button @click="imgModal = true">更换</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </template>
            </Panel>
        </BaseEdit>
        <imgModal v-model="imgModal" v-on:selectimg="eleSelectimg"></imgModal>
    </div>
</template>

<script>
    import BaseEdit from '@/components/property/BaseEditPlan.vue'
    import imgModal from '@/components/modals/ImgModals.vue'
    import * as config from '@/api/config'
    export default {
        name: "TextEditPlan",
        components: {
            BaseEdit,
            imgModal
        },

        props: {
            elems: { type: Object },
            editorElement: { type: Object },
        },

        data(){
            return {
                isPageActiv: true,
                isLayerActiv: false,
                imgModal: false,
                caryHost: config.caryHost + '/',
            }
        },

        methods: {
            // 更换图片
            eleSelectimg(imgsrc){
                this.elems.imgSrc = imgsrc.fileUrl
            },
        }
    }
</script>

<style scoped>
    .p-img-icon {
        width: 84px;
        height: 84px;
        padding: 2px;
        text-align: center;
        border: thin dotted #7f7f7f;

    }

</style>
