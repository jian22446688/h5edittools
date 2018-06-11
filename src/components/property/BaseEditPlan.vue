<template>
    <div style="width: 100%;">
        <Collapse value="1">

            <!--插入其他属性-->
            <slot></slot>

            <Panel name="1">
                基本属性
                <template slot="content">
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">类型</Col>
                        <Col span="16">{{ toTypeform(elems.type) }}</Col>
                    </Row>

                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">X</Col>
                        <Col span="16">
                            <InputNumber v-model="elems.left" style="width: 100%;" :min="0" size="large"></InputNumber>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">Y</Col>
                        <Col span="16">
                            <InputNumber v-model="elems.top" style="width: 100%;" :min="0" size="large"></InputNumber>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">宽</Col>
                        <Col span="16">
                            <InputNumber v-model="elems.width" style="width: 100%;" :min="0" size="large"></InputNumber>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">高</Col>
                        <Col span="16">
                            <InputNumber v-model="elems.height" style="width: 100%;" :min="0" size="large"></InputNumber>
                        </Col>
                    </Row>

                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">旋转</Col>
                        <Col span="16">
                            <Slider v-model="elems.transform" :min="0" :max="359" show-input></Slider>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">透明度</Col>
                        <Col span="16">
                            <Slider v-model="elems.opacity" :min="1" :max="100" show-input></Slider>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">背景颜色</Col>
                        <Col span="16">
                            <ColorPicker style="margin-left: 35px;" v-model="elems.bgColor" size="large" recommend alpha/>
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
                            <Select v-model="elems.borderStyle">
                                <Option v-for="item in borderstyleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">颜色</Col>
                        <Col span="16">
                            <ColorPicker style="margin-left: 35px;" v-model="elems.borderColor" size="large" recommend />
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">宽度</Col>
                        <Col span="16">
                            <Slider v-model="elems.borderWidth" :min="1" :max="50" show-input></Slider>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">圆角</Col>
                        <Col span="16">
                            <Slider v-model="elems.borderRadius" :min="1" :max="50" show-input></Slider>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">高</Col>
                        <Col span="16">
                            <InputNumber style="width: 100%;" :min="0" size="large"></InputNumber>
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
                            <Slider v-model="elems.boxShadow_h" :min="-50" :max="50" show-input></Slider>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">Y位置</Col>
                        <Col span="16">
                            <Slider v-model="elems.boxShadow_v" :min="-50" :max="50" show-input></Slider>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">模糊</Col>
                        <Col span="16">
                            <Slider v-model="elems.boxShadow_sp" :min="0" :max="100" show-input></Slider>
                        </Col>
                    </Row>
                    <Row class="c-row-margin" :gutter="8">
                        <Col class="c-col-left" span="6">颜色</Col>
                        <Col span="16">
                            <ColorPicker style="margin-left: 35px;" v-model="elems.boxShadow_color" size="large" recommend alpha/>
                        </Col>
                    </Row>
                </template>
            </Panel>
        </Collapse>
    </div>
</template>

<script>
    export default {
        name: "BaseEditPlan",
        props: {
            elems: { type: Object },
        },
        data(){
            return {
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
            }
        },
        methods: {

            toTypeform(type){
                switch (type){
                    case 'text':
                        return '文本'
                    case 'pic':
                        return '图片'
                }
            },
        }
    }
</script>

<style>
    .c-row-margin{
        margin-bottom: 6px;
        line-height: 36px;
    }
    .c-col-left {
        text-align: right;
    }
</style>
