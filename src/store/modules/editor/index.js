import * as types from '../../mutation-types'
import * as url from '../../../api/urls';
import Theme from '@/models/Theme';
import Page from '@/models/Page';
import Element from '@/models/Element';
import {login} from "../../../api/urls";

const state = {

    isLogin: false,

    homeThemeList: [],

    themeList: [],

    isShowThemeedit: false,

    editorElement: {}, // 当前编辑的层

    editorPage: { elements: [] }, // 当前编辑的页面

    editorTheme: { title: '', description: '', canvasHeight: 504 }, // 正在编辑的主题

    userUpimg_List: { count: 0, data: [] },

    themeUpimg_List: { count: 0, data: [] },

    publicUpimg_List: { count: 0, data: [] },
}

/**
 * **************************************************************************************************************************************************************
 *
 * actions
 *
 * **************************************************************************************************************************************************************
 */
const actions = {

    //创建和保存 H5主题
    saveTheme({ commit }, theme) {
        if(theme && theme.userId){
            console.log("更新内容")
            return Promise.resolve(url.updateTheme(theme).then((res)=> {
            }))
        } else {
            console.log("保存内容");
            return Promise.resolve(url.saveTheme(theme).then((res) =>{
                commit(types.ADD_THEME_SUCCESS, res.body)
            }))
        }
    },

    // 用户
    useTheme({}, data){
        url.useTheme(data._id).then((res) => {})
    },

    // 刷新编辑页面的 获取单个页面
    pageFindOne({ commit }, itemid){
        if(itemid){
            return new Promise((resolve, reject) => {
                url.pageFindnoe(itemid).then(res => {
                    if(res.code === 0){
                        commit(types.SET_CUR_EDITOR_THEME, res.body);
                        resolve()
                    }else {
                        reject()
                    }
                })
            })
        }
    },

    //获取首页h5页面
    getHomeThemeList({ commit }){
        url.getHomeThemeList().then((res) => {
            commit(types.GET_HOME_THEME_LIST, res.body)
        })
    },

    //获取用户制作的页面
    getUserThemeList({ commit }, userid){
        url.getUserThemeList(userid).then((res) => {
            commit(types.GET_USER_LIST, res.body)
        })
    },

    //删除一个H5作品
    userDeleteTheme({ commit }, themeItem){
       return Promise.resolve(url.deleteTheme(themeItem._id).then(() =>{
            commit(types.DELETE_THEME, themeItem)
       }))
    },

    //获取用户上传的图片
    userUpimg_List({ commit, state }, param){
        return new Promise((resolve, reject) => {
            url.getUserUpimg(this.state.user.userinfo._id, param).then(res => {
                if(res.code === 0) {
                    commit(types.GET_USER_IMG_LIST, res.body)
                    resolve()
                }else {
                    reject()
                }
            })
        })
    },

    //获取用户制作的H5上传图片
    themeUpimg_List({ commit, state }, param){
        let themeid = state.editorTheme._id
        if(themeid){
            return new Promise((resolve, reject) => {
                url.getThemeUpimg(themeid, param).then(res => {
                    if(res.code === 0) {
                        commit(types.GET_THEME_IMG_LIST, res.body)
                        resolve()
                    }else {
                        reject()
                    }
                })
            })
        }
    },

    //获取公共图片
    publicUpimg_List({ commit }, param){
        return new Promise((resolve, reject) => {
            url.getPublicUpimg(param).then(res => {
                if(res.code === 0){
                    commit(types.GET_PUBLIC_IMG_LIST, res.body)
                    resolve()
                }else {
                    reject()
                }
            })
        })
    },

    //删除图片
    deleteImg({ commit }, imgid){
        return new Promise((resolve, reject) => {
            url.deleteImg(imgid).then(res => {
                if (res.code === 0) {
                    resolve()
                }else {
                    reject()
                }
            })
        })
    }

}

/**
 * **************************************************************************************************************************************************************
 *
 * mutations
 *
 * **************************************************************************************************************************************************************
 */
const mutations = {
    // createTheme
    // 记得默认图片一定是 upload/all/img_default.png 已经在服务器上面了
    [types.CREATE_THEME](state, data){
        let newh5 = new Theme({ title: data.title, description: data.des, themebg: 'upload/all/img_default.png'});
        state.themeList.push(newh5);
        this.commit(types.SET_CUR_EDITOR_THEME, newh5);
    },

    // use_create_theme 用户使用模板
    [types.USE_CREATE_THEME](state, data){
        let newh5 = new Theme()
        newh5.title = data.title + "_模板"
        newh5.bgMusic = data.bgMusic
        newh5.themebg = data.themebg
        newh5.type = data.type
        newh5.pages = data.pages
        state.themeList.push(newh5);
        this.commit(types.SET_CUR_EDITOR_THEME, newh5);
    },

    // delete_theme
    [types.DELETE_THEME](state, data){
        state.themeList.findIndex((value, index)=>{
            if(value === data) state.themeList.splice(index, 1)
        })
    },

    // add_theme_success
    [types.ADD_THEME_SUCCESS](state, data){
        state.editorTheme._id = data._id;
    },

    // add_page
    [types.ADD_PAGE](state){
        let newP = new Page()
        newP.name = state.editorTheme.pages.length +1
        state.editorTheme.pages.push(newP)
    },

    // up_page
    [types.UP_PAGE](state, index){
        let x = index, y = index -1
        state.editorTheme.pages.splice(x, 1, ...state.editorTheme.pages.splice(y, 1, state.editorTheme.pages[x]))
    },

    // down_page
    [types.DOWN_PAGE](state, index){
        let x = index, y = index +1
        state.editorTheme.pages.splice(x, 1, ...state.editorTheme.pages.splice(y, 1, state.editorTheme.pages[x]))
    },

    // copy_page
    [types.COPY_PAGE](state, data){
        state.editorTheme.pages.findIndex((value, index) => {
            if(value === data.data) {
                // let { ...pa} = data.data;
                let pa = JSON.parse(JSON.stringify(data.data))
                state.editorTheme.pages.splice(index + 1, 0, pa);
                data.this.$nextTick(() => {
                    this.commit(types.SET_CUR_EDITOR_PAGE, pa)
                })
            }
        })
    },

    // delete_page
    [types.DELETE_PAGE](state, data){
        state.editorTheme.pages.findIndex((value, index, arr)=> {
            if(value === data) state.editorTheme.pages.splice(index, 1)
        })
    },

    // set_cur_editor_theme 设置当前编辑的H5
    [types.SET_CUR_EDITOR_THEME](state, theme){
        state.editorTheme = theme
        state.editorPage = state.editorTheme.pages[0]
    },

    // set_cur_editor_page 设置当前编辑的 页面
    [types.SET_CUR_EDITOR_PAGE](state, page){
        state.editorPage = page
    },

    // clear_edit_theme
    [types.CLEAR_EDIT_THEME](state){
        state.editorTheme   = {}
        state.editorPage    = {}
        state.editorElement = {}
    },

    // todo 操作 正删改查 element 页面元素
    [types.ELE_ADD_TEXT](state, ele) {
        let el = new Element(ele)
        state.editorElement = el
        state.editorPage.elements.push(el)
        let list = state.editorPage.elements
        let lastIndex = state.editorPage.elements.length - 1
        list[lastIndex].zindex = lastIndex ? list[lastIndex - 1].zindex + 1 : 1
    },

    // ele_copy_element
    [types.ELE_COPY_ELEMENT](state){
        if(state.editorElement){
            let pa = {...state.editorElement};
            pa.left = pa.left + 6
            pa.top = pa.top + 6
            this.commit(types.ELE_ADD_TEXT, pa)
        }else {
            console.log('当前元素为空')
        }
    },

    // delete_element
    [types.DELETE_ELEMENT](state){
        if(state.editorElement){
            state.editorPage.elements.findIndex((val, index)=>{
                if(val === state.editorElement){
                    state.editorPage.elements.splice(index, 1)
                    state.editorElement = null
                }
            })
        }
    },

    // set ele_cur_up_top
    [types.ELE_CUR_UP_TOP](state){
        let arr = state.editorPage.elements
        let objindex = null
        arr.findIndex((val, index) => {
            if(val === state.editorElement) objindex = index
        })
        let y = arr.length -1
        arr.splice(objindex, 1, ...arr.splice(y, 1, arr[objindex]))
        for (let i = 0; i < arr.length ; i++) arr[i].zindex = i + 1
    },

    // set ele_cur_up_one
    [types.ELE_CUR_UP_ONE](state){
        let arr = state.editorPage.elements
        let objindex = null
        arr.findIndex((val, index) => {
            if(val === state.editorElement) objindex = index
        })
        let y = objindex + 1
        arr.splice(objindex, 1, ...arr.splice(y, 1, arr[objindex]))
        for (let i = 0; i < arr.length ; i++) arr[i].zindex = i + 1
    },

    // set ele_cur_down_top
    [types.ELE_CUR_DOWN_TOP](state){
        let arr = state.editorPage.elements
        let objindex = null
        arr.findIndex((val, index) => {
            if(val === state.editorElement) objindex = index
        })
        let y = 0
        arr.splice(objindex, 1, ...arr.splice(y, 1, arr[objindex]))
        for (let i = 0; i < arr.length ; i++) arr[i].zindex = i + 1
    },

    // set ele_cur_down_one
    [types.ELE_CUR_DOWN_ONE](state){
        let arr = state.editorPage.elements
        let objindex = null
        arr.findIndex((val, index) => {
            if(val === state.editorElement) objindex = index
        })
        if(objindex === 0) return
        let y = objindex - 1
        arr.splice(objindex, 1, ...arr.splice(y, 1, arr[objindex]))
        for (let i = 0; i < arr.length ; i++) arr[i].zindex = i + 1
    },

    //set_cur_editor_element 设置当前编辑的元素
    [types.SET_CUR_EDITOR_ELEMENT](state, ele){
        state.editorElement = ele
    },

    //
    [types.CLEAR_CUR_ELEMENT](state){
        state.editorElement =  null
    },

    //get_home_theme_list
    [types.GET_HOME_THEME_LIST](state, data){
        state.homeThemeList = data
    },

    //get_user_theme_list
    [types.GET_USER_LIST](state, data){
        state.themeList = data
    },

    //获取用户上传图片
    // get_user_img_list
    [types.GET_USER_IMG_LIST](state, data){
        state.userUpimg_List.count = data.count
        state.userUpimg_List.data[data.index] = data.data.reverse()
    },

    //get_theme_img_list
    [types.GET_THEME_IMG_LIST](state, data){
        state.themeUpimg_List.count = data.count
        state.themeUpimg_List.data[data.index] = data.data.reverse()
    },

    //get_public_img_list
    [types.GET_PUBLIC_IMG_LIST](state, data){
        state.publicUpimg_List.count = data.count
        state.publicUpimg_List.data[data.index] = data.data.reverse()
    },

    // del_delete_img
    [types.DEL_DELTE_IMG](state, name){
        state[name].count--
        state[name].data = []
    },

    // add_upload_img
    [types.ADD_UPLOAD_IMG](state, name){
      state[name].count++
      state[name].data = []
    },

    // 清楚 vuex 里面的图片数据
    [types.IMG_CLAER_DATA](state, name){
        state[name].count = 0
        state[name].data = []
    },

    // 播放动画
    [types.PLAY_ANIMATE](state){
        let elements = state.editorPage.elements
        let editingElement = state.editorElement
        if (editingElement && editingElement.animatedName) {
            // 如存在有动画的选择元素
            editingElement.playing = true
        } else if (!editingElement) {
            // 不存在被选择的元素
            elements.forEach(v => {
                v.playing = true
            })
        }

        let target = state.editorElement || state.editorPage.elements || null
        let time = 0
        if (target instanceof Array) {
            target.forEach(v => {
                time = v['animatedName'] && (v['duration'] + v['delay']) > time ? (v['duration'] + v['delay']) : time
            })
        } else if (target instanceof Object) {
            time = (target['duration'] + target['delay'])
        }
        setTimeout(() => {
            this.commit(types.STOP_ANIMATE, target)
        }, time * 1000)
    },

    // 停止动画
    [types.STOP_ANIMATE](state, data){
        if (data instanceof Array) {
            // 该页元素
            data.forEach(v => {
                v['playing'] = false
            })
        } else if (data instanceof Object) {
            // 单个元素
            data['playing'] = false
        } else {
            // 不传参情况
            state['editorPage']['elements'].forEach(v => {
                v['playing'] = false
            })
        }
    },



}

/**
 * **************************************************************************************************************************************************************
 *
 * getters
 *
 * **************************************************************************************************************************************************************
 */
const getters = {

    getHomeThemeList(state){
        return state.homeThemeList
    },
    getUserThemeList(state){
        return state.themeList
    },

}
export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
}
