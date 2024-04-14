import axios from "axios";
const service = axios.create({
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 拦截到请求后，可以进行一些操作
    // 一般是添加token

    // 请求放行
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    console.log("请求拦截出错，错误信息：", err);
  }
);
// 响应拦截
service.interceptors.response.use(
  (response) => {
    // 拦截到请求后，可以进行各种判断
    const res = response.data;
    return res;
  },
  (err) => {
    console.log("响应拦截出错，错误信息：", err);
  }
);
export default service;
