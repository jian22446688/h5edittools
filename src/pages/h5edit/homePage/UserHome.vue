<style lang="less">
    @import "./home.less";
</style>
<template>
    <div class="my-themes">
        <div class="container">
            <div class="theme-box">
                <div style="margin-left: 10px">
                    <ul class="theme-list">
                        <Card  class="theme-item">
                            <div style="height: 100%; position: relative;">
                                <div class="c-create-add" @click="onCreateTheme">
                                    <Icon size="130" type="plus-round"></Icon>
                                    <h2>创建作品</h2>
                                </div>
                            </div>
                        </Card>
                        <template v-for="(item, key, index) in themelist">
                            <Card class="theme-item">
                                <div class="thumb">
                                    <img :src=" baseHost + item.themebg">
                                    <div class="cover">
                                        <div class="toolbar">
                                            <Tooltip content="编辑" placement="top">
                                                <i style="cursor: pointer;" @click="toEditor(item)"><Icon size="22" type="edit"></Icon></i>
                                            </Tooltip>
                                            <Tooltip content="删除" placement="top">
                                                <i style="cursor: pointer;" @click="deleteTheme(item)"><Icon size="22" type="trash-a"></Icon></i>
                                            </Tooltip>
                                        </div>
                                        <Button class="preview" size="large" @click="showPreView(item.userId)" icon="play">预览</Button>
                                    </div>
                                </div>
                                <div class="footer">
                                    <div class="title">{{ item.title }}</div>
                                    <div class="content">{{ item.description }}</div>
                                </div>
                            </Card>
                        </template>
                    </ul>
                </div>
            </div>
        </div>

        <Modal v-model="modal_create" :mask-closable="false" :footerHide="true">
            <h2>创建页面</h2>
            <Input v-model="inputTile" placeholder="请输入标题..." style="padding-top: 16px"></Input>
            <Input v-model="inputDes" type="textarea" :rows="4" placeholder="请输入简介..." style="padding-top: 16px"></Input>
            <div style="height: 48px; padding-top: 16px">
                <Button :disabled="!inputTile" @click="onModalOk" type="primary" style="float: right;">确定</Button>
            </div>
        </Modal>
        <perview v-model="modal_preView"></perview>
    </div>
</template>

<script>
    import Perview from '@/components/modals/previewModal'
    import Qrcode from '@xkeshi/vue-qrcode'
    import * as types from '@/store/mutation-types'
    import * as config from '@/api/config'

    export default {
        name: 'home',
        components:{
            perview:Perview,
            qrcode: Qrcode,
        },
        data () {
            return {
                inputTile: '',
                inputDes: '',
                qrcodeAdderss: 'http://xxxxxxxxxxxxxxx',
                modal_create: false,
                modal_preView: false,
                baseHost: config.caryHost
            };
        },
        computed: {
            themelist(){
                return this.$store.state.editor.themeList
            }
        },
        mounted(){
            this.$store.dispatch('getUserThemeList', this.$store.state.user.userinfo._id);
        },
        methods: {
            toEditor(item){
                console.log("编辑：" + item);
                this.$router.push({ path: '/edit', query: { itemId: item._id }})
            },
            deleteTheme(item){
                console.log("删除：" + item);
                this.$Modal.confirm({title: "删除作品",content: "是否确定删除？？？",
                    onOk: () => {
                        this.$store.dispatch('userDeleteTheme', item).then(() => {
                            this.$Message.success('删除成功');
                        })
                    }
                })
            },
            showPreView(item_id){
                console.log("预览：" + item_id);
                this.modal_preView = true;
            },
            onCreateTheme(){
                this.modal_create = true;
            },
            //创建新的作品
            onModalOk(){
                this.modal_create = false;
                this.$store.commit(types.CREATE_THEME, { title: this.inputTile, des: this.inputDes })
                this.$store.commit(types.ADD_PAGE);
                //todo 访问网络保存当创建的页面
                this.$store.dispatch('saveTheme', JSON.parse(JSON.stringify(this.$store.state.editor.editorTheme))).then((res) => {
                    // todo 跳转到编辑页面
                    this.$router.push({ path: '/edit', query: { itemId: this.$store.state.editor.editorTheme._id }})
                });
                //清空 创建也没的数据
                this.inputDes = "";
                this.inputTile = "";
            },
        }
    };
</script>
