<template>
    <div style="width: 100%;">
        <BaseEdit :elems="elems">

            <Panel name="1">
                文本属性
                <template slot="content">
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">文本</Col>
                        <Col span="16">
                            <Input v-model="elems.text" type="textarea" :autosize="{minRows: 2,maxRows: 2}" placeholder="输入文本内容..."/>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">对齐</Col>
                        <Col span="16">
                            <RadioGroup v-model="elems.textAlign" type="button" >
                                <Radio label="left"  >左</Radio>
                                <Radio label="center">中</Radio>
                                <Radio label="right" >右</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">行高</Col>
                        <Col span="16">
                            <InputNumber v-model="elems.lineHeight" style="width: 100%;" :min="0" size="large"></InputNumber>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">字体</Col>
                        <Col span="16">
                            <Select v-model="elems.fontWeight">
                                <Option value="normal">正常</Option>
                                <Option value="bold">粗体</Option>
                                <Option value="lighter">更细</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">大小</Col>
                        <Col span="16">
                            <Slider v-model="elems.fontSize" :min="0" :max="100" show-input></Slider>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">颜色</Col>
                        <Col span="16">
                            <ColorPicker style="margin-left: 35px;" v-model="elems.color" size="large" recommend />
                        </Col>
                    </Row>
                </template>
            </Panel>
        </BaseEdit>
    </div>
</template>

<script>
    import BaseEdit from '@/components/property/BaseEditPlan.vue'
    export default {
        name: "TextEditPlan",
        components: {
            BaseEdit
        },

        props: {
            elems: { type: Object },
            editorElement: { type: Object },
        },

        data(){
            return {
                isPageActiv: true,
                isLayerActiv: false,
                imgModal: false,
            }
        },

        methods: {
            // 更换图片
            eleSelectimg(imgsrc){
                this.elems.imgSrc = imgsrc.fileUrl
            },
        }
    }
</script>

<style scoped>

</style>


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
