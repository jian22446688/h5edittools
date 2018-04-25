<template>
    <div class="editor">
        <Layout class="editor-layout">
            <Header style="padding-left: 20px; height: 60px; padding-right: 20px">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <span class="layout-left-icon">
                        <a @click="onBtnBackEvent" ><Icon class="back-icon" color="#fff" size="28" type="chevron-left"></Icon></a>
                        <div class="layout-logo">
                            <span style="width: 100%;position: absolute; left: 0;line-height: 32px">编辑工具</span>
                        </div>
                    </span>
                    <span class="c-layout-componetns-icon">
                        <Button type="dashed"><Icon type="compose" color="#e9eaec"  size="28"></Icon></Button>
                        <Button type="dashed" @click="imgModal = true"><Icon type="image" color="#e9eaec"  size="28"></Icon></Button>
                        <Button type="dashed"><Icon type="ios-videocam" color="#e9eaec"  size="28"></Icon></Button>
                        <Button type="dashed"><Icon type="play" color="#e9eaec"  size="28"></Icon></Button>
                    </span>
                    <span class="layout-btn">
                        <Button style="display: inline-block" @click="onSaveEvent" type="primary" :loading="saveloading">
                                <span v-if="!saveloading">保存</span>
                                <span v-else>保存中...</span>
                        </Button>
                        <Button style="display: inline-block" @click="onSettingEvent" type="primary">设置</Button>
                        <Button style="display: inline-block" @click="onPreviewEvent" type="primary">预览</Button>
                    </span>
                </Menu>
            </Header>
            <Content class="c-layout-content">
                <div class="c-layout-left-page">
                    <PageAndLayer></PageAndLayer>
                </div>

                <div class="c-layout-content-stage">
                    <EditPanelLayer></EditPanelLayer>
                </div>

                <div class="c-layout-right-control">
                    <ProPertyLayer></ProPertyLayer>
                </div>
            </Content>
        </Layout>

        <imgModal v-model="imgModal" v-on:selectimg="onSelectimg"></imgModal>


    </div>
</template>

<script>
    import PageAndLayer from '@/components/modals/PageAndLayer.vue'
    import ProPertyLayer from  '@/components/modals/ProPertyLayer.vue'
    import EditPanelLayer from '@/components/modals/EditPanel.vue'
    import imgModal from '@/components/modals/ImgModals.vue'
    export default {
        components: {
            PageAndLayer: PageAndLayer,
            ProPertyLayer: ProPertyLayer,
            EditPanelLayer: EditPanelLayer,
            imgModal: imgModal
        },
        name: "edit",
        data(){
            return {
                isPageActiv: true,
                isLayerActiv: false,
                canvasWidth: 320,
                canvasHeight: 504,
                imgModal: false,
                saveloading: false,
                // 页面里面数据
                itemId: null
            }
        },
        created() {
            this.itemId = this.$route.query.itemId
            if(this.itemId){
                this.$store.dispatch('pageFindOne', this.itemId)
            } else {
                console.log("没有传入数据")
                // this.$router.go(-1)

            }
        },
        mounted() {
            // window.onbeforeunload = onbeforeunload_handler;
            // window.onunload = onunload_handler;
            // function onbeforeunload_handler() {
            //     var warning = "确认退出?";
            //     return warning;
            // }
            //
            // function onunload_handler() {
            //     var warning = "谢谢光临";
            //     alert(warning);
            // }

        },
        methods: {
            //返回首页
            onBtnBackEvent(){

            },
            //保存
            onSaveEvent(){
                this.saveloading = true
                console.log(this.itemId);
                let pa = JSON.parse(JSON.stringify(this.$store.state.editor.editorTheme))
                this.$store.dispatch('saveTheme', pa).then(res => {
                    // TODO 更新成功
                    setTimeout(()=>{
                        this.saveloading = false
                    }, 500)
                })
            },
            //设置
            onSettingEvent(){

            },
            // 预览
            onPreviewEvent(){

            },

            onlayer(){
                this.isPageActiv = !this.isPageActiv;
                this.isLayerActiv = !this.isLayerActiv;
            },
            onPage(){
                this.isLayerActiv = !this.isLayerActiv;
                this.isPageActiv = !this.isPageActiv;
            },
            onSelectimg(img){
                console.log(img)
            }
            ,
            ontest(){
                console.log(this.pages);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "edit";
</style>
