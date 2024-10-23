import axios from "axios";
import { ElMessage } from "element-plus";

// 创建axios对象
let request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use((req) => {
  // 在发送请求之前做些什么
  // 比如添加token
  return req;
});

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 对响应数据做点什么
    // 比如判断状态码
    return res.data;
  },
  (error) => {
    // 对响应错误做点什么
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
  }
);
