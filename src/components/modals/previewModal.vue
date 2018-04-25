<template>
    <Modal v-model="modal_preView" :mask-closable="false" @on-visible-change="onVisibleChange" width="798" :footerHide="true">
        <h2>预览-设置</h2>
        <Row style="margin-top: 16px; margin-bottom: 16px">
            <Col span="12">
            <div style="width:360px; padding: 8px; border: 1px solid #dddee1; border-radius: 4px">
                <div style="width:340px; height: 530px; background: #7f7f7f">
                    <iframe :src="qrcodeAdderss" width="100%" height="100%" frameborder="0"></iframe>
                </div>
            </div>
            <div style="text-align: center; margin-top: 3px;">
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
                    <Input style="margin-top: 6px" v-model="inputTile" placeholder="请输入标题..." ></Input>
                </div>
                <br>
                <div>
                    <Input v-model="inputDes" type="textarea" :autosize="{ minRows: 3, maxRows: 4 }" placeholder="请输入简介..." ></Input>
                </div>
                <br>
                <h3>手机扫码查看</h3>
                <div style="width: 100%; margin-top: 6px">
                    <Row>
                        <Col style="text-align: center" span="12">
                        <qrcode :options="{ size: 164 }" :value="qrcodeAdderss" ></qrcode>
                        </Col>
                        <Col span="12">

                        </Col>
                    </Row>
                    <div>
                        <Input id="themeurlid" type="textarea" :autosize="{ minRows: 2, maxRows: 3 }"
                               :value="qrcodeAdderss" size="large" readonly placeholder="显示url"></Input>
                        <Button slot="append" @click="onCopyEvent" style="margin-top: 6px">复制连接</Button>
                    </div>
                </div>

            </div>
            </Col>
        </Row>
    </Modal>
</template>

<script>
    import Qrcode from '@xkeshi/vue-qrcode';
    export default {
        name: "preview-modal",
        components: {
            qrcode: Qrcode,
        },
        props: {
            value: { type: Boolean, default: false },
            title: { type: String, default: "title" },
            des: { type: String, default: 'descr', },
            qurl: { type: String, default: 'http://h5.limesoftware.cn/pages/5abb31cf24d46f25373b28c7.html', }
        },
        data(){
            return{
                inputTile: this.title,
                inputDes: this.des,
                qrcodeAdderss: this.qurl,
                modal_preView: this.preview,
            }
        },
        watch: {
            value(val){
                this.modal_preView = val;
            },

        },
        computed:{

        },
        created() {
        },
        mounted() {

        },
        methods: {
            //弹出框更换状态
            onVisibleChange(visible){
                if(!visible){
                    this.$emit('input', visible);
                }
            },
            onCopyEvent(){
                let ele = document.getElementById("themeurlid");
                ele.getElementsByTagName("textarea")[0].select()
                document.execCommand("copy");
            }

        }
    }
</script>

<style scoped>

</style>
