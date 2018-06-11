<template>
    <Modal v-model="modal_preView" :mask-closable="false" @on-visible-change="onVisibleChange" width="798" :footerHide="true">
        <h2>预览-设置</h2>
        <Row style="margin-top: 16px; margin-bottom: 16px">
            <Col span="12">
            <div class="preview-plan">
                <div class="preview-iframe">
                    <iframe :src="qrcodeAdderss" width="100%" height="100%" frameborder="0"></iframe>
                </div>
            </div>
            <div style="text-align: center; margin-top: 6px;">
                <ButtonGroup shape="circle">
                    <Button ><Icon type="chevron-left"></Icon>上一页</Button>
                    <Button >下一页<Icon type="chevron-right"></Icon></Button>
                </ButtonGroup>
            </div>
            </Col>
            <Col span="12">
            <div>
                <h3>设置作品信息</h3>
                <div>
                    <Input style="margin-top: 6px" v-model="theme.title" :readonly="!getStatusEdit()" placeholder="请输入标题..." ></Input>
                </div>
                <br>
                <div>
                    <Input v-model="theme.description" type="textarea"  :readonly="!getStatusEdit()" :autosize="{ minRows: 3, maxRows: 4 }" placeholder="请输入简介..." ></Input>
                </div>
                <br>

                <div style="width: 100%; margin-top: 6px ">
                    <Row>
                        <Col style="text-align: center" span="12">
                            <h3>手机扫码查看</h3>
                            <qrcode :options="{ size: 164 }" :value="qrcodeAdderss" ></qrcode>
                        </Col>
                        <Col style="text-align: center" span="12">
                            <h3>H5封面</h3>
                            <div style="margin-top: 14px; ">
                               <div class="theme-bg">
                                   <img  v-if="theme.themebg" :src="baseHost + theme.themebg" width="134" height="134" alt="">
                                   <div v-if="getStatusEdit()" class="setting-change-bg">
                                       <Upload multiple
                                               :action="uploadUrl + userinfo._id"
                                               name="uploadFile"
                                               :show-upload-list="false"
                                               :max-size="2048"
                                               :on-success="handleSuccess"
                                               :on-format-error="handleFormatError"
                                               :on-exceeded-size="handleMaxSize">
                                           <Button type="primary" icon="ios-cloud-upload">上传图片</Button>
                                       </Upload>
                                   </div>
                               </div>
                            </div>
                        </Col>
                    </Row>
                    <div>
                       <Row>
                           <Col span="18">
                               <Input id="themeurlid" type="textarea" :autosize="{ minRows: 2, maxRows: 2 }"
                                      :value="qrcodeAdderss" size="large" readonly placeholder="显示url"></Input>
                           </Col>
                           <Col span="6"><Button @click="onCopyEvent" style="line-height: 3rem;">复制</Button></Col>
                       </Row>
                    </div>

                   <div style=" margin-top: 16px">
                       <Button type="primary" v-if="$route.path === '/edit'" @click="onSave"                    >保存</Button>
                       <Button type="primary" v-if="$route.path === '/usertheme'" @click="onToEditor"           >编辑</Button>
                       <Button type="primary" v-if="getStatusEdit() && theme.status === 0" @click="onToBuild"   >发布</Button>
                       <Button type="primary" v-if="getStatusEdit()" @click="onToDownload"                      >下载</Button>
                       <Button type="primary" v-if="!getStatusEdit() || $route.path === '/usertheme'"  @click="onUseTemplate">使用模板</Button>
                   </div>

                </div>
            </div>
            </Col>
        </Row>
    </Modal>
</template>

<script>
    import qrcode from '@xkeshi/vue-qrcode';
    import * as config from '@/api/config'
    export default {
        name: "preview-modal",
        components: {
            qrcode,
        },
        props: {
            value: { type: Boolean, default: false },
            theme: { type: Object, default: {
                    title: '',
                    description: '',
                    themebg: ''
                }},
            title: { type: String, default: "title" },
            des: { type: String, default: 'descr', },
            qurl: { type: String, default: '', }
        },
        data(){
            return{
                inputTile: this.title,
                inputDes: this.des,
                qrcodeAdderss: this.qurl,
                modal_preView: this.preview,
                baseHost: config.caryHost + '/',
                uploadUrl: config.caryHost + 'api/edit/files/uploads?userid=',
                isImgModal: false,
            }
        },
        watch: {
            value(val){
                this.modal_preView = val;
            },

        },
        computed:{
            userinfo(){
                let info = this.$store.state.user.userinfo
                let ob = {}
                if(info){
                    ob = info
                }else {
                    ob = {
                        _id: ''
                    }
                }
                return ob
            },

            getThemebg(){
                let bg = this.theme.themebg
                if(bg === 'upload/all/img_default.png'){
                    return ''
                }
                return bg || ''
            }

        },
        created() {
        },
        mounted() {

        },
        methods: {

            //获取是否可以编辑
            getStatusEdit(){
                if(this.$route.path === '/edit' || this.$route.path === '/usertheme'){
                    return true
                }else {
                    return false
                }
            },

            //弹出框更换状态
            onVisibleChange(visible){
                if(!visible){
                    this.$emit('input', visible);
                    this.qrcodeAdderss = ''
                }else {
                    this.qrcodeAdderss = this.baseHost + 'api/edit/preview/' + this.theme._id
                }
            },

            onCopyEvent(){
                let ele = document.getElementById("themeurlid");
                ele.getElementsByTagName("textarea")[0].select()
                document.execCommand("copy");
            },

            //上传回调
            handleSuccess (res, file) {
                this.theme.themebg = res.body[0].url
            },

            handleFormatError (file) {
                this.$Notice.warning({title: '文件格式不正确。', desc: '文件格式 ' + file.name + ' 不正确，请选择JPG或PNG.'});
            },

            handleMaxSize (file) {
                this.$Notice.warning({title: '超出文件大小限制', desc: '文件  ' + file.name + ' 太大，不超过2M。'});
            },

            onSave(){
                let pa = JSON.parse(JSON.stringify(this.theme))
                this.$store.dispatch('saveTheme', pa).then(res => {
                    // TODO 更新成功
                    this.$Message.success('保存成功')
                })
            },

            onToEditor(){
                this.$store.dispatch('pageFindOne', this.theme._id).then(() => {
                    this.$router.push({ path: '/edit', query: { itemId: this.theme._id }})
                }).catch(err => {
                    this.$Message.error('获取数据失败')
                })
            },

            onToBuild(){
                this.theme.status = 1
                let pa = JSON.parse(JSON.stringify(this.theme))
                this.$Spin.show();
                this.$store.dispatch('saveTheme', pa).then(res => {
                    // TODO 发布成功
                    this.$Message.success('发布成功')
                    this.$Spin.hide();
                })
            },

            onToDownload(){
                this.$Message.warning('正在努力开发')
                window.location.href = this.baseHost + 'api/edit/thdownload/' + this.theme._id
            },

            onUseTemplate(){
                if(this.userinfo._id){
                    let useTheme = JSON.parse(JSON.stringify(this.theme))
                    this.$store.commit('USE_CREATE_THEME', useTheme)
                    this.$Spin.show();
                    this.$store.dispatch('saveTheme', JSON.parse(JSON.stringify(this.$store.state.editor.editorTheme))).then((res) => {
                        // todo 跳转到编辑页面
                        this.$store.dispatch('pageFindOne', this.$store.state.editor.editorTheme._id).then(() => {
                            this.$Spin.hide();
                            this.$router.push({ path: '/edit', query: { itemId: this.$store.state.editor.editorTheme._id }})
                        }).catch(err => {
                            this.$Message.error('获取数据失败')
                            this.$Spin.hide();
                        })
                    });
                    this.$store.dispatch('useTheme', useTheme)
                }else {
                    this.$Message.warning('请先登录')
                }
            },

            ontest(){
                console.log(this.theme.path === '/edit');
            }
        }
    }
</script>

<style scoped>
    .preview-plan {
        width:348px;
        padding: 2px;
        border: 1px solid #dddee1;
        border-radius: 4px
    }
    .preview-iframe {
        width: 342px;
        height: 582px;
        background: #fff
    }

    .setting-change-bg {
        display: none;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .theme-bg:hover .setting-change-bg {
        display: block;
    }

</style>
