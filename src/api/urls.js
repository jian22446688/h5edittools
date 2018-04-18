import * as http from '../utils/http'
import * as api from './api'

export const getThemeList = (type = 'h5') => {
  return http.get(api.GET_THEMELIST + '?type='+ type)
}

export const getUserThemeList = (type = 'h5') => {
  return http.get(api.GET_THEMELIST + '?type='+ type)
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
    http.get(api.GET_LOGOUT)
}


