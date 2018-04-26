<template>
    <Modal  v-model="modal_preView" title="选择图片" :mask-closable="false" @on-visible-change="onVisibleChange" width="828"  :footerHide="true">
        <Row>
            <Col class="leftmenu" span="4">
                <Menu style="width:auto" theme="light" :active-name="curMenu" @on-select="onMenuSelectEvent">
                    <MenuItem name="themeUpimg_List"><Icon type="ios-compose"></Icon>项目资源</MenuItem>
                    <MenuItem name="userUpimg_List"><Icon type="android-home"></Icon>我的图片</MenuItem>
                    <MenuItem name="publicUpimg_List"><Icon type="chatbubbles"></Icon>公用图片</MenuItem>
                </Menu>
                <Upload v-if="curMenu != 'publicUpimg_List'" style="margin-top: 60px" ref="upload"
                        name="uploadFile"
                        :action="uploadUrl + userinfo._id + '/' + editorTheme._id"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :max-size="2048"
                        :on-success="handleSuccess"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        multiple
                        :format="['jpg','jpeg','png']">
                    <Button style="position: absolute; bottom: 0" type="primary" @click="onBtnUpload" size="large" long>上传图片</Button>
                </Upload>

            </Col>
            <Col class="leftmenu" span="20">
                <div style="width: 100%; margin: 0 auto; ">
                    <div style="margin-left: 16px; text-align: left">
                        <div class="img-upload-list" v-for="item in uploadList">
                            <!--<template v-if="item.status === 'finished'">-->
                            <template >
                                <img :src="baseHost + item.fileUrl">
                                <div class="img-upload-list-cover">
                                    <a @click="handleRemove(item)"> <Icon size="28" type="eye" ></Icon></a>
                                    <Button type="primary" shape="circle" @click="onBtnSelectImg(item)" >使用</Button>
                                </div>
                            </template>
                            <!--<template v-else>-->
                                <!--<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>-->
                            <!--</template>-->
                        </div>
                    </div>
                </div>
                <Page class="pageindex" :current="curPage" :total="themeUpimg_List.count" @on-change="onPageChange" :page-size="20" size="small"></Page>
            </Col>
        </Row>
    </Modal>
</template>

<script>
    import util from '@/utils/util'
    import * as config from '@/api/config'

    export default {
        name: "img-modals",
        props: {
            value: { type: Boolean, default: false },
        },
        data(){
            return{
                modal_preView: false,
                baseHost: config.caryHost,
                uploadUrl: config.caryHost + 'api/edit/files/upload/',
                defaultList: [
                    // {
                    //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    // },
                    // {
                    //     'name': 'bc7521e033abdd1e92222d733590f104',
                    //     'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    // },
                    // {
                    //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    // },
                ],
                uploadList: [],
                pageList: [],
                visible: false,
                curPage: 1,
                curMenu: 'themeUpimg_List',
            }
        },
        watch: {
            value(val){
                this.modal_preView = val;
            },
            themeUpimg_List(val){

            }
        },
        created() {

        },
        computed: {
            editorTheme(){
                return this.$store.state.editor.editorTheme
            },

            userinfo(){
                return this.$store.state.user.userinfo
            },

            userUpimg_List(){
                return this.$store.state.editor.userUpimg_List
            },

            themeUpimg_List(){
                return this.$store.state.editor.themeUpimg_List
            },

            publicUpimg_List(){
                return this.$store.state.editor.publicUpimg_List
            },
        },
        mounted() {
            console.log('enter edit')
        },
        methods: {
            //弹出框更换状态
            onVisibleChange(visible){
                if(!visible){
                    this.$emit('input', visible);
                }else {
                    // TODO 更新图片数据
                    this.updateImgList()
                }
            },

            // 更新显示数据
            updateImgList(isup=false){
                // isup  true 必定更新  false 判断是否有缓存数据有就不用访问网络
                if(isup){
                    this.$store.dispatch(this.curMenu, { pageSize: 20, pageIndex: this.curPage }).then(() => {
                        this.$nextTick(() => { this.uploadList = this[this.curMenu].data[this.curPage] })
                    })
                }else {
                    if(this[this.curMenu].data[this.curPage]){
                       this.$nextTick(() => { this.uploadList = this[this.curMenu].data[this.curPage] })
                    } else {
                        this.$store.dispatch(this.curMenu, { pageSize: 20, pageIndex: this.curPage }).then(() => {
                            this.$nextTick(() => {
                                this.uploadList = this[this.curMenu].data[this.curPage]
                            })
                        }).catch(err => {
                            this.$Message.error('获取数据失败')
                        })
                    }
                }
            },

            handleRemove (file) {
                this.$Modal.confirm({
                    title: '提示 - 预览和删除',
                    okText: '取消',
                    cancelText: '确定删除',
                    render: (h) => {
                        return h('img', {
                            attrs: { src: this.baseHost + file.fileUrl },
                            style: { width: '100%', marginTop: '8px'  },
                        })
                    },
                    onOk: ()=> { },
                    onCancel: () => {
                        this.$store.dispatch('deleteImg', file._id).then(() => {
                            this.$store.commit('DEL_DELTE_IMG', this.curMenu)
                            this.updateImgList(true)
                        })
                    }
                })
            },

            //上传回调
            handleSuccess (res, file) {
                this.uploadList.pop()
                this.uploadList.unshift(res.body)
                this.$store.commit('ADD_UPLOAD_IMG', this.curMenu)
            },

            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确。',
                    desc: '文件格式 ' + file.name + ' 不正确，请选择JPG或PNG.'
                });
            },

            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件  ' + file.name + ' 太大，不超过2M。'
                });
            },

            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多可以上传五张图片。'
                    });
                }
                return check;
            },

            // 上传按钮点击事件
            onBtnUpload(){
                this.onPageChange(1)
            },

            // 菜单更换事件
            onMenuSelectEvent(name){
                this.curPage = 1;
                this.curMenu = name
                console.log(name)
                this.updateImgList(true)
            },

            //页面更换
            onPageChange(page){
                this.curPage = Number(page);
                this.updateImgList(false)
            },

            // 选择使用的图片 'selectimg'
            onBtnSelectImg(imgitem) {
                this.$emit('selectimg', imgitem)
                this.modal_preView = false;
            }
        }
    }
</script>

<style scoped>

    .leftmenu {
        height: 600px;
        position: relative;
    }
    .pageindex {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    .img-upload-list {
        display: inline-block;
        width: 120px;
        height: 120px;
        text-align: center;
        line-height: 120px;
        border-radius: 4px;
        overflow: hidden;
        background: #000;
        position: relative;
        margin-right: 4px;
    }
    .img-upload-list img{
        width: 100%;
        height: 100%;
    }
    .img-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .img-upload-list-cover a {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: relative;
        top: 0px;
    }

    .img-upload-list-cover button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 8px;
    }
    .img-upload-list:hover .img-upload-list-cover {
        display: block;
    }




</style>
