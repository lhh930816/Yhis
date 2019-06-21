
import axios from 'axios'
// import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  // headers: {'Content-Type': 'application/json'},
//   baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})
// 设置 post、put 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
service.interceptors.request.use(config => {
  if (config.method === 'post' || config.method === 'put') {
    // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
    config.data = JSON.stringify(config.data)
  }// else if (config.method === 'get' && browser.isIE) {
  // 给GET 请求后追加时间戳， 解决IE GET 请求缓存问题
  //     let symbol = config.url.indexOf('?') >= 0 ? '&' : '?'
  //     config.url += symbol + '_=' + Date.now()
  //   }
  // 请求发送前进行处理
  return config
}, error => {
  // 请求错误处理
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(response => {
  let {data} = response
  return data
}, error => {
  let info = {}
  let {status, statusText, data} = error.response
  if (!error.response) {
    info = {
      code: 5000,
      msg: 'Network Error'
    }
  } else {
    // 此处整理错误信息格式
    info = {
      code: status,
      data: data,
      msg: statusText
    }
  }
  return Promise.reject(info)
})

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
  return service
}
