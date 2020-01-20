import axios from 'axios';
import router from '../router';
import store from '../store/index'

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.push({
        path: '/login',
    });
}

// 创建一个实例
const instance = axios.create({
    // 将我们访问的地址设为baseURL
    baseURL: "http://localhost:3000",
    // 设置超时时间
    timeout: 5000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Credentials": true
    },
    // withCredentials: true
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
            // 403 token过期
            // 清除token并跳转登录页
        case 403:
            console.log('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
            // 404请求不存在
        case 404:
            console.log('请求的资源不存在');
            break;
        default:
            console.log(other);
    }
}

// 实例添加请求拦截器
instance.interceptors.request.use(config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = window.localStorage.getItem("token"); //获取存储在本地的token
    config.data = JSON.stringify(config.data);
    config.headers = {
        'Content-Type': 'application/json' //设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
    };
    if (token) {
        config.headers.Authorization = "Token " + token; //携带权限参数
    }
    return config;
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 请求成功
    error => {
        const { response } = error;
        /*服务器状态码不是2开头的的情况
         *这里可以跟你们的后台开发人员协商好统一的错误状态码
         *然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
         *下面列举几个常见的操作，其他需求可自行扩展
         */
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
                store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error);
            }
        }
    })

export default instance;