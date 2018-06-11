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

                <!--插入不同的组件属性-->
                <ImgEditPlan v-if="editorElement.type === 'pic'" :elems.sync="editorElement"></ImgEditPlan>

                <TextEditPlan v-if="editorElement.type === 'text'" :elems.sync="editorElement"></TextEditPlan>

            </div>
            <div v-show="isLayerActiv" style="width: 100%; ">
               <div v-if="editorElement.type">
                   <Collapse  value="1" accordion>
                       <Panel name="1">
                           添加动画
                           <template slot="content">
                               <Row class="c-row-margin" :gutter="8">
                                   <Col class="c-col-left" span="6">动画名称</Col>
                                   <Col span="16">
                                       <Select v-model="editorElement.animatedName" >
                                           <Option value="">无动画</Option>
                                           <OptionGroup v-for="(key, value) in animnameList" :label="key.title" :key="value">
                                               <Option v-for="(k, v) in key" :value="v" :key="v" v-if="v != 'title'">{{ k }}</Option>
                                           </OptionGroup>
                                       </Select>
                                   </Col>
                               </Row>

                               <Row class="c-row-margin" :gutter="8">
                                   <Col class="c-col-left" span="6">动画时长</Col>
                                   <Col span="16">
                                       <Slider v-model="editorElement.duration" :min="0" :max="20" :step=".1" show-input></Slider>
                                   </Col>
                               </Row>
                               <Row class="c-row-margin" :gutter="8">
                                   <Col class="c-col-left" span="6">动画延时</Col>
                                   <Col span="16">
                                       <Slider v-model="editorElement.delay"  :min="0" :max="20" :step=".1" show-input></Slider>
                                   </Col>
                               </Row>
                               <Row class="c-row-margin" :gutter="8">
                                   <Col class="c-col-left" span="6">动画次数</Col>
                                   <Col span="16">
                                       <Slider v-model="editorElement.count" :min="0" :max="100" :disabled="editorElement.loop" show-input></Slider>
                                   </Col>
                               </Row>
                               <Row class="c-row-margin" :gutter="8">
                                   <Col class="c-col-left" span="6">动画循环</Col>
                                   <Col span="16"><i-switch v-model="editorElement.loop" ></i-switch></Col>
                               </Row>

                           </template>
                       </Panel>
                   </Collapse>
                   <div style="width: 100%; text-align: center; margin-top: 12px">
                       <Row :gutter="8">
                           <!--<Col span="12" style="padding-left: 12px"> <Button type="primary" long @click="onAddAnimate">添加动画</Button> </Col>-->
                           <Col span="24" style="padding-right: 12px; padding-left: 12px;">
                               <Button type="success" long @click="onPreviewAnimate">预览动画</Button>
                           </Col>
                       </Row>
                   </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
    import colorPicker from '@/components/plugin/colorPicker.vue'
    import animname from '@/models/animateName.js'

    import ImgEditPlan from'@/components/property/ImgEditPlan.vue'
    import TextEditPlan from'@/components/property/TextEditPlan.vue'

    export default {
        name: "page-and-layer",
        components: {
            colorPicker,
            ImgEditPlan,
            TextEditPlan
        },
        props: [],
        data(){
            return {
                isPageActiv: true,
                isLayerActiv: false,
                animnameList: animname.animatename,
                animList: [],
                animListActiv: '0',
            }
        },

        created() {

        },

        computed: {
            editorElement() {
                let ele = this.$store.state.editor.editorElement
                return ele || {}
            },
        },

        mounted() {

        },

        methods: {

            onlayer(){
                if(this.isLayerActiv) return

                this.isPageActiv = !this.isPageActiv;
                this.isLayerActiv = !this.isLayerActiv;
            },

            onPage(){
                if(this.isPageActiv) return
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

            // 预览动画
            onPreviewAnimate(){
                this.$store.commit('PLAY_ANIMATE')
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




<!--<div style="width: 100%;">-->
    <!--<Collapse value="1" accordion>-->
        <!--<Panel name="1">-->
            <!--基本属性-->
            <!--<template slot="content">-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">类型</Col>-->
                    <!--<Col span="16">text</Col>-->
                <!--</Row>-->

                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">X</Col>-->
                    <!--<Col span="16">-->
                        <!--<InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">Y</Col>-->
                    <!--<Col span="16">-->
                        <!--<InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">宽</Col>-->
                    <!--<Col span="16">-->
                        <!--<InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">高</Col>-->
                    <!--<Col span="16">-->
                        <!--<InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">文本</Col>-->
                    <!--<Col span="16">-->
                        <!--<Input type="textarea" :autosize="{minRows: 2,maxRows: 2}" placeholder="输入文本内容..."/>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">对齐</Col>-->
                    <!--<Col span="16">-->
                        <!--<Button type="primary" size="small">左</Button>-->
                        <!--<Button type="primary" size="small">中</Button>-->
                        <!--<Button type="primary" size="small">右</Button>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">旋转</Col>-->
                    <!--<Col span="16">-->
                        <!--<Slider :min="0" :max="359" show-input></Slider>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">透明度</Col>-->
                    <!--<Col span="16">-->
                        <!--<Slider :min="1" :max="100" show-input></Slider>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">颜色</Col>-->
                    <!--<Col span="16">-->
                        <!--<ColorPicker style="margin-left: 35px;" v-model="color3" size="large" recommend />-->
                    <!--</Col>-->
                <!--</Row>-->
            <!--</template>-->
        <!--</Panel>-->
        <!--<Panel name="2">-->
            <!--边框属性-->
            <!--<template slot="content">-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">样式</Col>-->
                    <!--<Col span="16">-->
                        <!--<Select >-->
                            <!--<Option v-for="item in borderstyleList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                        <!--</Select>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">颜色</Col>-->
                    <!--<Col span="16">-->
                        <!--<ColorPicker style="margin-left: 35px;" v-model="color3" size="large" recommend />-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">粗细</Col>-->
                    <!--<Col span="16">-->
                        <!--<Slider :min="1" :max="50" show-input></Slider>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">圆角</Col>-->
                    <!--<Col span="16">-->
                        <!--<Slider :min="1" :max="50" show-input></Slider>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">高</Col>-->
                    <!--<Col span="16">-->
                        <!--<InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">文本</Col>-->
                    <!--<Col span="16">-->
                        <!--<Input type="textarea" :autosize="{minRows: 2,maxRows: 2}" placeholder="输入文本内容..."/>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">对齐</Col>-->
                    <!--<Col span="16">-->
                        <!--<Button type="primary" size="small">左</Button>-->
                        <!--<Button type="primary" size="small">中</Button>-->
                        <!--<Button type="primary" size="small">右</Button>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">旋转</Col>-->
                    <!--<Col span="16">-->
                        <!--<Slider :min="0" :max="359" show-input></Slider>-->
                    <!--</Col>-->
                <!--</Row>-->

            <!--</template>-->
        <!--</Panel>-->
        <!--<Panel name="3">-->
            <!--阴影属性-->
            <!--<template slot="content">-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">X位置</Col>-->
                    <!--<Col span="16">-->
                        <!--<Slider :min="0" :max="100" show-input></Slider>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">Y位置</Col>-->
                    <!--<Col span="16">-->
                        <!--<Slider :min="0" :max="100" show-input></Slider>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">模糊距离</Col>-->
                    <!--<Col span="16">-->
                        <!--<Slider :min="0" :max="100" show-input></Slider>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">尺寸</Col>-->
                    <!--<Col span="16">-->
                        <!--<Slider :min="0" :max="100" show-input></Slider>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">内部阴影</Col>-->
                    <!--<Col span="16"><i-switch ></i-switch></Col>-->
                <!--</Row>-->

                <!--<Row class="c-row-margin" :gutter="8">-->
                    <!--<Col class="c-col-left" span="6">颜色</Col>-->
                    <!--<Col span="16">-->
                        <!--<ColorPicker style="margin-left: 35px;" v-model="color3" size="large" recommend />-->
                    <!--</Col>-->
                <!--</Row>-->
            <!--</template>-->
        <!--</Panel>-->
    <!--</Collapse>-->

<!--</div>-->
