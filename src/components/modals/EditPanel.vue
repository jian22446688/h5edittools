<template >
    <div class="container">
        <div style="position: absolute; width: 100%; height: 100%;" @click.stop="onBackroundEvent"></div>

        <div class="page-bg">

        </div>

        <!--<div @mousedown.stop="mousedown($event, 'nw')">-->
            <!--<img src="@/assets/logo.png" alt="">-->
        <!--</div>-->


        <!--<Picele :element="element"-->
                <!--:showOperate="true"-->
                <!--:style="{ width:element.width+'px',-->
                          <!--height:element.height+'px',-->
                          <!--top:element.top+'px',-->
                          <!--left:element.left + 'px'}"></Picele>-->

        <v-contextmenu ref="contextmenu">
            <template v-for="menu in eontextMenuData">
                <v-contextmenu-item v-if="menu.name" @click="onContextmenuEvent(menu.name)">
                    <Icon :type="menu.icon" size="18"></Icon>
                     {{menu.title}}
                </v-contextmenu-item>
                <v-contextmenu-item v-else divider></v-contextmenu-item>
            </template>
        </v-contextmenu>

        <template v-for="elem in elems">
            <div @mousedown="selectedEle($event, elem)"  @contextmenu="showMenu($event, elem)">
                <Picele
                    v-if="elem.type === 'pic'"
                    :element="elem"
                    :style="{ width:elem.width+'px',
                      height:elem.height+'px',
                      top:elem.top+'px',
                      left:elem.left + 'px'}"
                    :showOperate="editorElement == elem">
                </Picele>
            </div>
        </template>
    </div>
</template>

<script>

    import Picele from '@/components/module/PicElement.vue'

    import * as config from '@/api/config'

    export default {
        name: "edit-panel",
        components: { Picele },
        props: {
            elems: { type: Array },
            editorElement: { type: Object },
        },
        data(){
            return {
                caryHost: config.caryHost,
                eontextMenuData: [
                    {title: '复制元素',
                        name: 'copy',
                        icon: 'ios-copy-outline'
                    },
                    {title: '删除元素',
                        name: 'delete',
                        icon: 'ios-trash-outline'
                    },
                    {title: null,
                        name: null,
                        icon: null
                    },
                    {title: '置于顶层',
                        name: 'uptop',
                        icon: 'ios-arrow-up'
                    },
                    {title: '上移一层',
                        name: 'upone',
                        icon: 'ios-arrow-up'
                    },
                    {title: null,
                        name: null,
                        icon: null
                    },
                    {title: '下移一层',
                        name: 'downone',
                        icon: 'ios-arrow-down'
                    },
                    {title: '置于底层',
                        name: 'downbottom',
                        icon: 'ios-arrow-down'
                    },

                ],
                element: {
                    left: 0,
                    top: 0,
                    width: 100,
                    height: 100,
                    currentX: 0,
                    currentY: 0,
                    flag: false,
                    scaleFlag: false,
                    direction: '',
                    imgSrc: config.caryHost + 'upload/5ad961afefe0e90ca35ffc92/img_b41b68f049df11e89a4e55d3491f4b3f.png'
                },
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {

            showMenu (event, ele) {
                event.preventDefault()
                this.$refs.contextmenu.show({top: event.clientY, left: event.clientX})
            },

            selectedEle(event, ele){
                this.$store.commit('SET_CUR_EDITOR_ELEMENT', ele)
            },

            onBackroundEvent(){
                this.$store.commit('CLEAR_CUR_ELEMENT') // 清楚当前选择元素
            },

            onContextmenuEvent(btnanme){
                switch (btnanme){
                    case 'copy':
                        this.$store.commit('ELE_COPY_ELEMENT')
                        break;
                    case 'delete':
                        this.$store.commit('DELETE_ELEMENT')
                        break;
                    case 'uptop':
                        this.$store.commit('ELE_CUR_UP_TOP')
                        break;
                    case 'upone':
                        this.$store.commit('ELE_CUR_UP_ONE')
                        break;
                    case 'downone':
                        this.$store.commit('ELE_CUR_DOWN_ONE')
                        break;
                    case 'downbottom':
                        this.$store.commit('ELE_CUR_DOWN_TOP')
                        break;
                }
                console.log(" 右键的名字：" +btnanme)
            },
        }
    }
</script>

<style scoped>

    .container{
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /*overflow: hidden;*/
        z-index: 10;
    }
    .container img {
        position: absolute;
    }
    .page-bg{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    }
    .elem {
        position: absolute;
    }
</style>
