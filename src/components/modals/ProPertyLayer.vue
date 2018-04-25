<template>
    <div style="height: 100%; width: 100%">
        <Row>
            <Col style="text-align: center;" span="12">
                <div  style="margin-right: 0.5px" @click="onPage" class="c-left-tab-text"
                  v-bind:class="{'c-layout-tab-n': !isPageActiv,'c-layout-tab-activ': isPageActiv }">属性</div>
            </Col>
            <Col style="text-align: center" span="12">
                <div style="margin-left: 0.5px" @click="onlayer" class="c-left-tab-text"
                 v-bind:class="{'c-layout-tab-n': !isLayerActiv,'c-layout-tab-activ': isLayerActiv }">动画</div>
            </Col>
        </Row>
        <div class="c-left-tab-page custom-scrollbar">
            <div v-show="isPageActiv" style="width: 100%;">
                <div style="width: 100%;">
                    <Collapse value="1" accordion>
                        <Panel name="1">
                            基本属性
                            <template slot="content">
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">类型</Col>
                                    <Col span="16">text</Col>
                                </Row>

                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">X</Col>
                                    <Col span="16">
                                    <InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">Y</Col>
                                    <Col span="16">
                                    <InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">宽</Col>
                                    <Col span="16">
                                    <InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">高</Col>
                                    <Col span="16">
                                    <InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">文本</Col>
                                    <Col span="16">
                                    <Input type="textarea" :autosize="{minRows: 2,maxRows: 2}" placeholder="输入文本内容..."/>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">对齐</Col>
                                    <Col span="16">
                                    <Button type="primary" size="small">左</Button>
                                    <Button type="primary" size="small">中</Button>
                                    <Button type="primary" size="small">右</Button>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">旋转</Col>
                                    <Col span="16">
                                    <Slider :min="0" :max="359" show-input></Slider>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">透明度</Col>
                                    <Col span="16">
                                    <Slider :min="1" :max="100" show-input></Slider>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">颜色</Col>
                                    <Col span="16">
                                    <ColorPicker style="margin-left: 35px;" v-model="color3" size="large" recommend />
                                    </Col>
                                </Row>
                            </template>
                        </Panel>
                        <Panel name="2">
                            边框属性
                            <template slot="content">
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">样式</Col>
                                    <Col span="16">
                                    <Select >
                                        <Option v-for="item in borderstyleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">颜色</Col>
                                    <Col span="16">
                                        <ColorPicker style="margin-left: 35px;" v-model="color3" size="large" recommend />
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">粗细</Col>
                                    <Col span="16">
                                    <Slider :min="1" :max="50" show-input></Slider>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">圆角</Col>
                                    <Col span="16">
                                    <Slider :min="1" :max="50" show-input></Slider>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">高</Col>
                                    <Col span="16">
                                    <InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">文本</Col>
                                    <Col span="16">
                                    <Input type="textarea" :autosize="{minRows: 2,maxRows: 2}" placeholder="输入文本内容..."/>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">对齐</Col>
                                    <Col span="16">
                                    <Button type="primary" size="small">左</Button>
                                    <Button type="primary" size="small">中</Button>
                                    <Button type="primary" size="small">右</Button>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">旋转</Col>
                                    <Col span="16">
                                    <Slider :min="0" :max="359" show-input></Slider>
                                    </Col>
                                </Row>

                            </template>
                        </Panel>
                        <Panel name="3">
                            阴影属性
                            <template slot="content">
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">X位置</Col>
                                    <Col span="16">
                                        <Slider :min="0" :max="100" show-input></Slider>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">Y位置</Col>
                                    <Col span="16">
                                    <Slider :min="0" :max="100" show-input></Slider>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">模糊距离</Col>
                                    <Col span="16">
                                    <Slider :min="0" :max="100" show-input></Slider>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">尺寸</Col>
                                    <Col span="16">
                                    <Slider :min="0" :max="100" show-input></Slider>
                                    </Col>
                                </Row>
                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">内部阴影</Col>
                                    <Col span="16"><i-switch ></i-switch></Col>
                                </Row>

                                <Row class="c-row-margin" :gutter="8">
                                    <Col class="c-col-left" span="6">颜色</Col>
                                    <Col span="16">
                                    <ColorPicker style="margin-left: 35px;" v-model="color3" size="large" recommend />
                                    </Col>
                                </Row>
                            </template>
                        </Panel>
                    </Collapse>

                </div>
            </div>
            <div v-show="isLayerActiv" style="width: 100%; ">
                <Collapse v-model="animListActiv" accordion>
                    <Panel v-for="(item, index) in animList" :key="index" :name="index.toString()" >
                        动画 - {{ index + 1}}  <a style="margin-right: 10px; max-height: 38px; float: right" @click="onanimDelete(index, $event)">
                                    <Icon style="line-height: 38px; " size="26" type="trash-a"></Icon>
                                    </a>
                        <template slot="content">
                            <Row class="c-row-margin" :gutter="8">
                                <Col class="c-col-left" span="6">动画名称</Col>
                                <Col span="16">
                                <Select v-model="item.animN" >
                                    <OptionGroup v-for="(key, value) in animnameList" :label="key.title" :key="value">
                                        <Option v-for="(k, v) in key" :value="v" :key="v" v-if="v != 'title'">{{ k }}</Option>
                                    </OptionGroup>
                                </Select>
                                </Col>
                            </Row>
                            <Row class="c-row-margin" :gutter="8">
                                <Col class="c-col-left" span="6">动画曲线</Col>
                                <Col span="16">
                                <Select v-model="item.animease">
                                    <Option value="ease">自然</Option>
                                    <Option value="linear">匀速</Option>
                                    <Option value="ease-in">加速</Option>
                                    <Option value="ease-out">减速</Option>
                                    <Option value="ease-in-out">加减速</Option>
                                </Select>
                                </Col>
                            </Row>
                            <Row class="c-row-margin" :gutter="8">
                                <Col class="c-col-left" span="6">动画时长</Col>
                                <Col span="16">
                                <Slider v-model="item.animduration" :min="0" :max="20" show-input></Slider>
                                </Col>
                            </Row>
                            <Row class="c-row-margin" :gutter="8">
                                <Col class="c-col-left" span="6">动画延时</Col>
                                <Col span="16">
                                <Slider v-model="item.animdelay"  :min="0" :max="20" show-input></Slider>
                                </Col>
                            </Row>
                            <Row class="c-row-margin" :gutter="8">
                                <Col class="c-col-left" span="6">动画次数</Col>
                                <Col span="16">
                                <Slider v-model="item.animcount" :min="0" :max="100" show-input></Slider>
                                </Col>
                            </Row>
                            <Row class="c-row-margin" :gutter="8">
                                <Col class="c-col-left" span="6">动画循环</Col>
                                <Col span="16"><i-switch v-model="item.animloop"></i-switch></Col>
                            </Row>
                            <Row class="c-row-margin" :gutter="8">
                                <Col class="c-col-left" span="6">动画反向</Col>
                                <Col span="16"><i-switch v-model="item.animdirection"></i-switch></Col>
                            </Row>
                        </template>
                    </Panel>
                </Collapse>

                <div style="width: 100%; text-align: center; margin-top: 12px">
                    <Row :gutter="8">
                        <Col span="12" style="padding-left: 12px"> <Button type="primary" long @click="onAddAnimate">添加动画</Button> </Col>
                        <Col span="12" style="padding-right: 12px"> <Button type="success" long @click="onPreviewAnimate">预览动画</Button> </Col>
                    </Row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import colorPicker from '@/components/plugin/colorPicker.vue'
    import animname from '@/models/animateName.js'
    export default {
        name: "page-and-layer",
        components: { colorPicker: colorPicker },
        props: [],
        data(){
            return {
                isPageActiv: true,
                isLayerActiv: false,
                color3: 'rgb(25, 190,107)',
                borderstyleList: [
                    { label: '无', value: 'none' },
                    { label: '单实线', value: 'solid' },
                    { label: '虚线', value: 'dashed' },
                    { label: '点状线', value: 'dotted' },
                    { label: '双实线', value: 'double' },
                    { label: '3D凹槽', value: 'groove' },
                    { label: '3D垄状', value: 'ridge' },
                    { label: '3D内阴影', value: 'inset' },
                    { label: '3D外阴影', value: 'outset' },
                ],
                animnameList: animname.animatename,
                animList: [],
                animListActiv: '0',
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            onlayer(){
                if(this.isLayerActiv){
                    return
                }
                this.isPageActiv = !this.isPageActiv;
                this.isLayerActiv = !this.isLayerActiv;
            },
            onPage(){
                if(this.isPageActiv){
                    return
                }
                this.isLayerActiv = !this.isLayerActiv;
                this.isPageActiv = !this.isPageActiv;
            },
            onAddAnimate(){
                let animtemp = {
                    animN: '',
                    animease: 'ease',
                    animduration: 0,
                    animdelay: 0,
                    animcount: 0,
                    animloop: false,
                    animdirection: false
                }
                this.animList.push(animtemp);
                this.$nextTick(() =>{
                    this.animListActiv = (this.animList.length - 1).toString()
                })
            },
            onPreviewAnimate(){
                this.animListActiv = '2'
            },
            onanimDelete(index, e){
                e.stopPropagation()
                this.animList.splice(index, 1);
            }
        }
    }
</script>

<style scoped>

    .c-left-tab-text {
        text-align: center;
        cursor: pointer;
        padding: 8px;
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
    .c-row-margin{
        margin-bottom: 6px;
        line-height: 36px;
    }
    .c-col-left {
        text-align: right;
    }
</style>
