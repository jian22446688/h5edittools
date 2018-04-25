import * as http from '../utils/http'
import * as api from './api'

// user 用户 URl
export const getHomeThemeList = () => {
  return http.get('/api/edit/pages')
}

export const getUserThemeList = (userid) => {
  return http.get('/api/edit/pages?userid=' + userid)
}

export const getVarifycode = () => {
    return http.get(api.GET_VARIFYCODE)
}

export const register = (param) => {
    return http.post(api.POST_REGISTER, param)
}

export const login = (par) => {
    return http.post(api.POST_LOGIN, par)
}

export const logout = () => {
    return http.get(api.GET_LOGOUT)
}

export const userinfo = () => {
    return http.get(api.GET_USERINFO)
}


// editor 编辑器
export const saveTheme = (theme) => {
    return http.post('/api/edit/pages', theme)
}

export const updateTheme = (themeid) => {
    return http.put('api/edit/pages/'+ themeid._id, themeid)
}

export const deleteTheme = (themeid) => {
    return http.del('api/edit/pages',themeid)
}

export const pageFindnoe = (themeid) =>{
    return http.get('api/edit/pages/'+themeid)
}

