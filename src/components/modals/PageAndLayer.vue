<template>
    <div style="height: 100%; width: 100%; ">
        <Row>
            <Col style="text-align: center;" span="12">
            <div @click="onPage" class="c-left-tab-text"
                  v-bind:class="{'c-layout-tab-n': !isPageActiv,'c-layout-tab-activ': isPageActiv }">
                页面
            </div>
            </Col>
            <Col style="text-align: center" span="12">
            <div @click="onlayer" class="c-left-tab-text"
                 v-bind:class="{'c-layout-tab-n': !isLayerActiv,'c-layout-tab-activ': isLayerActiv }">
                图层
            </div>
            </Col>
        </Row>
        <div class="c-left-tab-page custom-scrollbar">
            <div v-show="isPageActiv" style="width: 100%;">
                <ul style="width: 100%; text-align: center ">
                    <li v-for="(page, index) in pageList" :key="index" @click="selectPage(page)"
                        style="margin-top: 0px; padding: 16px" >
                        <h2>{{ index + 1}}</h2>
                        <div v-bind:class="{'page-activ': page === curPage }" style="padding-top: 8px;padding-bottom: 8px">
                            <div class="listpage">
                                <PerviewPage style="transform-origin: left top; transform: scale(0.3947)" :elems.sync="page.elements"></PerviewPage>
                            </div>
                            <div v-show="page === curPage" class="listpage-control">
                                <Button style="padding: 0;" @click="onPageCopy(page)" type="text" title="复制一页">
                                    <Icon  size="22" type="ios-copy"></Icon>
                                </Button>
                                <Button style="padding: 0;" @click="onPageDelete(page)" :disabled="pageList.length == 1" type="text" title="删除一页">
                                    <Icon  size="22" type="trash-a"></Icon>
                                </Button>
                                <Button style="padding: 0;"  @click="onPageUp(index)" :disabled="index == 0" type="text" title="上移">
                                    <Icon  size="22" type="arrow-up-c"></Icon>
                                </Button>
                                <Button style="padding: 0;" @click="onPageDown(index)" :disabled="index == pageList.length -1" type="text" title="下移">
                                    <Icon  size="22" type="arrow-down-c"></Icon>
                                </Button>
                            </div>
                        </div>
                    </li>
                    <!--/////////添加新页面////////-->
                    <li>
                        <div class="listpage" style="line-height: 230px">
                            <a @click="onAddPage" ><Icon size="90" color="#80848f" type="plus-round"></Icon></a>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-show="isLayerActiv" style="width: 100%;">
                <ul>
                    <li v-for="(page, index) in layerList" :key="index" @click="selectLayer(page)" >
                        <div class="list-layer" v-bind:class="{'list-layer-activ': page === curLayer }">
                            <i class="thumb-layer" size="16" type="ios-copy"/>
                            {{ page.activ }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import PerviewPage from '@/components/modals/PreviewPage'
    export default {
        name: "page-and-layer",
        components: {
            PerviewPage
        },
        props: [],
        data(){
            return {
                curPageActtiv: 0,
                curLayerActtiv: 0,
                isPageActiv: true,
                isLayerActiv: false,
                isActiv: true,
            }
        },

        computed: {
            pageList(){
                return this.$store.state.editor.editorTheme.pages
            },
            layerList(){
                return this.$store.state.editor.editorPage.elements
            },
            curPage(){
                return this.$store.state.editor.editorPage
            },
            curLayer(){
                return this.$store.state.editor.editorElement
            }
        },

        created() {

        },
        mounted() {
        },
        methods: {

            onlayer(){
                if(this.isLayerActiv){ return }
                this.isPageActiv = !this.isPageActiv;
                this.isLayerActiv = !this.isLayerActiv;
            },

            onPage(){
                if(this.isPageActiv){ return }
                this.isLayerActiv = !this.isLayerActiv;
                this.isPageActiv = !this.isPageActiv;
            },

            onAddPage(){
                // 添加空白页面
                this.$store.commit('ADD_PAGE')
            },

            onPageCopy(page){
                let par = { 'this': this,  'data': page}
                this.$store.commit('COPY_PAGE', par)
            },

            onPageDelete(page){
                this.$Modal.confirm({title: "提示",content: "是否删除页面？？？",
                    onOk: () => { this.$store.commit('DELETE_PAGE', page) }
                })
            },

            onPageUp(page){
                this.$store.commit('UP_PAGE', page);
            },

            onPageDown(page){
                this.$store.commit('DOWN_PAGE', page);
            },

            selectPage(page) {
                this.$store.commit('CLEAR_CUR_ELEMENT')
                if(this.curPage === page){ return }
                this.$store.commit('SET_CUR_EDITOR_PAGE', page)
            },

            selectLayer(page){
                if(this.curLayer === page){ return }
                this.$store.commit('SET_CUR_EDITOR_ELEMENT', page)
            },
        }
    }
</script>

<style scoped>
    .c-left-tab-text {
        text-align: center;
        cursor: pointer;
        padding: 8px;
        margin-right: 0.5px
    }

    .c-left-tab-page{
        position: relative;
        width: 100%;
        height: calc(100% - 37px);
        overflow-y: auto;
        overflow-x: hidden;
        top: 0px;
        bottom: 190px;
        z-index: 5;
    }

    .page-activ {
        background-color: #2b85e4;
    }
    .page-nor {
        background-color: transparent;
    }

    .listpage{
        position: relative;
        width: 150px;
        height: 230px;
        margin: 0 auto;
        background-color: #f2f5f6;
    }

    .listpage-control {
        text-align: center;
        margin: 0 auto;
        width: 150px;
        background-color: #80848f
    }
    .listpage-control > button {
        margin-left: 6px;
        margin-right: 6px;
    }
    .list-layer {
        padding-left: 16px;
        height: 42px;
        line-height: 42px;
        font-size: 22px;
        border-bottom: 1px solid #90949f;
        cursor: pointer;
    }
    .thumb-layer {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 16px;
        background: white center no-repeat;
        background-size: cover;
    }

    .list-layer-activ {
        background-color: #80848f;
    }


</style>
