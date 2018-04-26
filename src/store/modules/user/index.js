import * as types from '../../mutation-types'
import * as url from '../../../api/urls';
import router from '@/router/index'

const state = {
    isLogin: true,
    userinfo: null,
    pageList: [],
    varifyimg: '',
    loginResult: undefined,


}

const actions = {
    //获取验证码
    getVarifyCodeImg({commit}){
        url.getVarifycode().then((res) => {
            commit(types.USER_GETVARIFYCODE, res)
        })
    },

    getUserInfo({commit}){
        url.userinfo().then((res) => {
            console.log(res)
            commit(types.USER_GET_USERINFO, res)
        })
    },

    //用户注册
    register({ commit }, param){
        url.register(param).then((res) => {
            commit(types.USER_POST_REGISTER, res)
        })
    },
    login({ commit }, param) {
        return new Promise((resolve, reject) => {
            url.login(param).then((res) => {
                commit(types.USER_POST_LOGIN, res)
                resolve(res)
            })
        }).catch(err => {
            reject(err)
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            url.logout().then((res) => {
                console.log('退出登录成功')
                commit(types.USER_GET_LOGOUT, res)
                resolve(res);
            })
        }).catch(err => {
            reject(err)
        })
    }
}

const mutations = {

    //获取验证码处理
    [types.USER_GETVARIFYCODE](sta, data){
        sta.varifyimg = data.body
    },

    [types.USER_POST_REGISTER](sta, data){
        if(data.code === 0){
            this.mag.success(data.message)
            router.push('/login')
        }else {
            this.mag.error(data.message)
        }
    },

    [types.USER_POST_LOGIN](sta, data){
        if(data.code === 0){
            sta.userinfo = data.body;
            //设置用户本地数据
            window.localStorage.setItem('userInfo', JSON.stringify(data.body));
            router.push('/')
            this.mag.success(data.message)
        }else {
            this.mag.error(data.message)
        }
    },

    [types.USER_GET_LOGOUT](sta, data){
        sta.userinfo = undefined;
        window.localStorage.removeItem('userInfo');
    },

    [types.USER_GET_USERINFO](sta, data){
        if(data.code != 0){
            sta.userinfo = null
            window.localStorage.removeItem('userInfo')
        }else {
            sta.userinfo = data.body
            //设置用户本地数据
            window.localStorage.setItem('userInfo', JSON.stringify(data.body));
        }
    },
}

const getters = {
    getVarifyCodeImg(sta){
        return sta.varifyimg
    },
    getUserInfo(sta){
        return sta.userinfo
    }
}

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
}
