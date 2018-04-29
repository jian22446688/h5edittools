<style lang="less">
    @import "./home.less";
</style>
<template>
    <div class="my-themes" @keyup.enter="show2()">
        <div class="container">
            <Card dis-hover style="margin-bottom: 16px;">
                <div class="c-menu-bg">
                    <Button @click="ontest" type="primary" shape="circle">时尚</Button>
                    <Button @click="ontest1" type="primary" shape="circle">海报</Button>
                    <Button @click="ontest2" type="primary" shape="circle">简历</Button>
                    <Button @click="ontest3" type="primary" shape="circle">测试</Button>
                </div>
            </Card>
            <div class="theme-box">
                <div style="margin-left: 10px">
                    <ul class="theme-list">
                        <template v-for="(item, key, index) in themelist">
                            <Card class="theme-item">
                                <div class="thumb">
                                    <img :src="basehost + item.themebg">
                                    <div class="cover">
                                        <div v-if="false" class="toolbar">
                                            <Tooltip content="编辑" placement="top">
                                                <i style="cursor: pointer;" @click="toEditor(item.userId)"><Icon size="22" type="edit"></Icon></i>
                                            </Tooltip>
                                            <Tooltip content="删除" placement="top">
                                                <i style="cursor: pointer;" @click="deleteTheme(item.userId)"><Icon size="22" type="trash-a"></Icon></i>
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

        <perview v-model="modal_preView"></perview>
    </div>
</template>

<script>
    import Perview from '@/components/modals/previewModal'
    import Qrcode from '@xkeshi/vue-qrcode'
    import * as config from '@/api/config'

    export default {
        name: 'home',
        components:{
            perview:Perview,
            qrcode: Qrcode,
        },
        data () {
            return {
                qrcodeAdderss: 'http://xxxxxxxxxxxxxxx',
                modal_preView: false,
                basehost: config.caryHost
            };
        },
        computed: {

            themelist(){
                return this.$store.state.editor.homeThemeList
            }
        },
        mounted(){
            this.$store.dispatch('getHomeThemeList');
        },
        methods: {
            toEditor(item){
                console.log("编辑：" + item);
            },
            deleteTheme(item){
                console.log("删除：" + item);
                this.$Modal.confirm({title: "删除作品",content: "是否确定删除？？？",
                    onOk: () => {
                        this.$Message.success('成功删除');
                    }
                })
            },

            show: function () {
                alert('你按了回车！');
            },
            show2: function () {
                alert('你按了回车！');
            },
            show3: function () {
                alert('你按了上键！');
            },
            show4: function () {
                alert('你按了下键！');
            },
            show5: function () {
                alert('你按了左键！');
            },
            show6: function () {
                alert('你按了右键！');
            },

            showPreView(item_id){
                console.log("预览：" + item_id);
                this.modal_preView = true;
            },

            ontest(){
                this.$axios.get('/api/users/userauth').then((res) => {
                    console.log(res)
                })
            },

            ontest1(){
                this.$axios.get('/api/users/usertest').then((res) => {
                    console.log(res)
                })
            },
            ontest2(){
                this.$axios.get('/api/users/userinfo').then((res) => {
                    console.log(res)
                })
            },
            ontest3(){
                this.$router.go(0)
            }


        }
    };
</script>
