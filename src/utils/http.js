import axios from 'axios'
import * as config from '../api/config'
const chttp = {}
axios.defaults.withCredentials = true
// axios.interceptors.response.use(data =>{
//     console.log('-- 拦截器 --')
//     console.log(data)
// },error => {})


var BACKEND_DOMAIN = 'http://localhost:3000'
if (process.env.NODE_ENV === 'production') {
    BACKEND_DOMAIN = config.caryHost
} else if (process.env.NODE_ENV === 'development') {
    BACKEND_DOMAIN = ''
}

/**
 * get请求
 * @param url
 * @param query
 * @returns { Promise<AxiosResponse<any>> }
 */
export const get = (url, query) => {
    let _url
    if(query){
        _url = `${BACKEND_DOMAIN}${url}?${query}`
    } else {
        _url = `${BACKEND_DOMAIN}${url}`
    }
    console.log('client: url: ' + _url)
    return axios.get(_url).then((res) => {
        if(res.status >= 200 && res.status < 300){
            return res.data
        }
    }).catch((err) => {
        errorProcess(err)
        return Promise.reject(err)
    })
}

/**
 * POST请求
 * @param url
 * @param query
 * @returns {Promise<AxiosResponse<any>>}
 */
export const post = (url, query = {}) => {
    let _url = `${BACKEND_DOMAIN}${url}`
    return axios.post(_url, query).then((res) => {
        if(res.status >= 200 && res.status < 300){ return res.data }
    }).catch((err) => {
        errorProcess(err)
        return Promise.reject(err)
    })
}


/**
 * put 请求
 * @param url
 * @param query
 * @returns {Promise<AxiosResponse<any>>}
 */
export const put = (url, query) => {
    let _url = `${BACKEND_DOMAIN}${url}`
    return axios.put(_url, query).then((res) => {
        if(res.status >= 200 && res.status < 300){ return res.data }
    }).catch((err) => {
        errorProcess(err);
        return Promise.reject(err);
    })
}

/**
 * delete 请求
 * @param url
 * @param article
 * @returns {Promise<AxiosResponse<any>>}
 */
export const del = (url, article) => {
    let _url = `${BACKEND_DOMAIN}${url}/${article}`
    return axios.delete(_url).then((res) => {
        if(res.status >= 200 && res.status <300){ return res.data }
    }).catch((err) => {
        errorProcess(err)
        return Promise.reject(err)
    })
}

/**
 * 网络求情错误处理
 * @param err
 */
const errorProcess = (err) => {
    if (err.status === 401) {
        console.error(err)
        // window.location.href = '#/login'
    }
}



