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




