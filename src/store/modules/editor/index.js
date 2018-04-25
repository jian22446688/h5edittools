import * as types from '../../mutation-types'
import * as url from '../../../api/urls';
import Element from '@/models/Element';
import Theme from '@/models/Theme';
import Page from '@/models/Page';

const state = {
    isLogin: false,
    homeThemeList: [],
    themeList: [],
    isShowThemeedit: false,
    editorElement: {}, // 当前编辑的层
    editorPage: { elements: [] }, // 当前编辑的页面
    editorTheme: {
        title: '',
        description: '',
        canvasHeight: 504,
        // pages: []
    }, // 正在编辑的主题
}

/**
 *
 * **************************************************************************************************************************************************************
 *
 * actions
 *
 * **************************************************************************************************************************************************************
 *
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

    // 刷新编辑页面的 获取单个页面
    pageFindOne({commit}, itemid){
        if(itemid){
            url.pageFindnoe(itemid).then(res => {
                commit(types.SET_CUR_EDITOR_THEME, res.body);
            })
        }
    },

    //获取首页h5页面
    getHomeThemeList({commit}){
        url.getHomeThemeList().then((res) => {
            commit(types.GET_HOME_THEME_LIST, res.body)
        })
    },

    //获取用户制作的页面
    getUserThemeList({commit}, userid){
        url.getUserThemeList(userid).then((res) => {
            commit(types.GET_USER_LIST, res.body)
        })
    },

    //删除一个H5作品
    userDeleteTheme({commit}, themeItem){
       return Promise.resolve( url.deleteTheme(themeItem._id).then(() =>{
            commit(types.DELETE_THEME, themeItem)
       }))
    }
}

/**
 *
 * **************************************************************************************************************************************************************
 *
 * mutations
 *
 * **************************************************************************************************************************************************************
 *
 */
const mutations = {
    // createTheme
    // 记得默认图片一定是 upload/all/img_default.png 已经在服务器上面了
    [types.CREATE_THEME](state, data){
        let newh5 = new Theme({ title: data.title, description: data.des, themebg: 'upload/all/img_default.png'});
        state.themeList.push(newh5);
        this.commit(types.SET_CUR_EDITOR_THEME, newh5);
    },

    // delete_theme
    [types.DELETE_THEME](state, data){
        state.themeList.findIndex((value, index)=>{
            if(value === data){
                state.themeList.splice(index, 1)
            }
        })
    },

    // add_theme_success
    [types.ADD_THEME_SUCCESS](state, data){
        console.log(data)
        state.editorTheme.userId = data._id;
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
                let pa = {...data.data};
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
            if(value === data){
                state.editorTheme.pages.splice(index, 1)
            }
        })
    },

    // set_cur_editor_theme 设置当前编辑的H5
    [types.SET_CUR_EDITOR_THEME](state, theme){
        state.editorTheme = theme
    },

    // set_cur_editor_page 设置当前编辑的 页面
    [types.SET_CUR_EDITOR_PAGE](state, page){
        state.editorPage = page
    },

    //set_cur_editor_element 设置当前编辑的元素
    [types.SET_CUR_EDITOR_ELEMENT](state, ele){
        state.editorElement = data
    },

    //get_home_theme_list
    [types.GET_HOME_THEME_LIST](state, data){
        state.homeThemeList = data
    },

    //get_user_theme_list
    [types.GET_USER_LIST](state, data){
        state.themeList = data
    }


}

/**
 *
 * **************************************************************************************************************************************************************
 *
 * getters
 *
 * **************************************************************************************************************************************************************
 *
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
