<template>
    <div class="editor" >
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
                        <Button type="dashed" title="文字" @click="eleTextBtn"><Icon type="compose" color="#e9eaec"  size="28"></Icon></Button>
                        <Button type="dashed" title="图片" @click="imgModal = true"><Icon type="image" color="#e9eaec"  size="28"></Icon></Button>
                        <Button type="dashed" title="形状" @click="eleShapeBtn"><Icon type="star" color="#e9eaec"  size="28"></Icon></Button>
                        <Button type="dashed" title="视频" ><Icon type="play" color="#e9eaec"  size="28"></Icon></Button>
                    </span>
                    <span class="layout-btn">
                        <Button style="display: inline-block" @click="onSaveEvent" type="primary" :loading="saveloading">
                                <span v-if="!saveloading">保存</span>
                                <span v-else>保存中...</span>
                        </Button>
                        <Button style="display: inline-block" @click="onSettingEvent" type="primary">设置预览</Button>
                    </span>
                </Menu>
            </Header>
            <Content class="c-layout-content">
                <div class="brake-click" @click="onBackroundEvent" @contextmenu="$event.preventDefault()"></div>
                <div class="c-layout-left-page">
                    <PageAndLayer></PageAndLayer>
                </div>

                <div class="c-layout-content-stage">
                    <EditPanelLayer :elems.sync="editorPage.elements" :editorElement="editorElement"></EditPanelLayer>
                </div>

                <div class="c-layout-right-control">
                    <ProPertyLayer></ProPertyLayer>
                </div>

            </Content>
        </Layout>
        <imgModal v-model="imgModal" v-on:selectimg="eleSelectimg"></imgModal>
        <Perview v-model="modal_preView" :theme="h5item"></Perview>
    </div>
</template>

<script>
    import PageAndLayer from '@/components/modals/PageAndLayer.vue'
    import ProPertyLayer from  '@/components/modals/ProPertyLayer.vue'
    import EditPanelLayer from '@/components/modals/EditPanel.vue'
    import imgModal from '@/components/modals/ImgModals.vue'
    import Perview from '@/components/modals/PreviewSetModal'
    import PerviewPage from '@/components/modals/PreviewPage'
    export default {
        name: "edit",

        components: {
            PageAndLayer: PageAndLayer,
            ProPertyLayer: ProPertyLayer,
            EditPanelLayer: EditPanelLayer,
            imgModal: imgModal,
            Perview,
            PerviewPage
        },

        data(){
            return {
                isPageActiv: true,
                isLayerActiv: false,
                canvasWidth: 320,
                canvasHeight: 504,
                imgModal: false,
                saveloading: false,
                itemId: null,
                modal_preView: false,
                h5item: {
                    title: 'title',
                    description: 'des'
                },
            }
        },

        created() {
            this.itemId = this.$route.query.itemId
            if(this.itemId){
                this.$store.dispatch('pageFindOne', this.itemId).then(() => {
                }).catch(err => {
                    this.$Message.error('获取编辑数据')
                    this.$router.go(-1)
                })
            }
        },

        computed: {

            themeId() {
                return this.$store.state.editor.editorTheme._id
            },

            editorPage() {
                return this.$store.state.editor.editorPage
            },

            editorElement() {
                let ele = this.$store.state.editor.editorElement
                return ele || {}
            },

            editorTheme(){
                return this.$store.state.editor.editorTheme
            },
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
                    }, 300)
                })
            },

            //设置和预览
            onSettingEvent(){
                this.modal_preView = true
                this.h5item = this.editorTheme
            },

            onlayer(){
                this.isPageActiv = !this.isPageActiv;
                this.isLayerActiv = !this.isLayerActiv;
            },

            onPage(){
                this.isLayerActiv = !this.isLayerActiv;
                this.isPageActiv = !this.isPageActiv;
            },

            onBackroundEvent(){
                this.$store.commit('CLEAR_CUR_ELEMENT') // 清楚当前选择元素
            },

            eleSelectimg(img){
                let param = {
                    type: 'pic',
                    width: img.width,
                    height: img.height,
                    imgSrc: img.fileUrl,
                }
                this.$store.commit('ELE_ADD_TEXT', param)
            },

            eleTextBtn(){
                let param = {
                    type: 'text',
                    text: '请输入文本',
                    width: this.canvasWidth,
                    height: 42,
                    lineHeight: 1.5,
                }
                this.$store.commit('ELE_ADD_TEXT', param)
            },

            eleShapeBtn(){
                this.$Message.warning('正在努力搭建')
            },
        },

        destroyed(){
            // 清楚当前编辑的 页面
            this.$store.commit('CLEAR_EDIT_THEME')
        }
    }
</script>

<style lang="less" scoped>
    @import "edit";
</style>
