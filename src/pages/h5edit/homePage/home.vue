<style lang="less">
    @import "./home.less";
</style>
<template>
    <div class="my-themes">
        <Carousel v-model="value3" autoplay :autoplay-speed="autoplaySpeed">
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="https://file2.rrxh5.cc/g1/2017/08/05/1501894640649.jpg" width="100%" height="100%" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="https://file2.rrxh5.cc/g1/2018/02/26/1519636883404.jpg" width="100%" height="100%" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="https://file2.rrxh5.cc/g1/2017/11/25/1511574863776.png" width="100%" height="100%" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="https://file2.rrxh5.cc/g1/2017/11/14/1510637878770.png" width="100%" height="100%" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="https://file2.rrxh5.cc/g1/2018/04/16/1523867601792.jpg" width="100%" height="100%" alt="">
                </div>
            </CarouselItem>
        </Carousel>
        <div class="container">
            <Card dis-hover style="margin-bottom: 16px;">
                <div class="c-menu-bg">
                    <Button @dblclick="ontest" type="primary" shape="circle">时尚</Button>
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
                                        <Button class="preview" size="large" @click="showPreView(item)" icon="play">预览</Button>
                                    </div>
                                </div>
                                <div class="footer">
                                    <div class="title">{{ item.title }}</div>
                                    <div style="height: 32px;">
                                        <span style="padding: 2px; background-color: #19be6b; color: #fff">模板</span>

                                    </div>
                                    <div class="content">{{item.use_count}} 次制作</div>
                                </div>
                            </Card>
                        </template>
                    </ul>
                </div>
            </div>
        </div>

        <perview v-model="modal_preView" :theme="h5item"></perview>
    </div>
</template>

<script>
    import Perview from '@/components/modals/PreviewSetModal'
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
                value3: 0,
                autoplaySpeed: 5000,
                qrcodeAdderss: 'http://xxxxxxxxxxxxxxx',
                modal_preView: false,
                h5item: {
                    title: 'title',
                    description: 'des'
                },
                basehost: config.caryHost + '/'
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
                this.$Modal.confirm({title: "删除作品", content: "是否确定删除？？？",
                    onOk: () => {
                        this.$Message.success('成功删除');
                    }
                })
            },

            showPreView(item){
                this.modal_preView = true;
                this.h5item =  item
            },

            ontest(){
                console.log('asdfasdfsdf')
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
