import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter)
    // 1. 定义 (路由) 组件。
    // 可以从其他文件 import 进来
const Login = () =>
    import ('views/login/Login')
const Home = () =>
    import ('views/home/Home')
    // 2. 定义路由
    // 每个路由应该映射一个组件。 其中"component" 可以是
    // 通过 Vue.extend() 创建的组件构造器，
    // 或者，只是一个组件配置对象。
    // 我们晚点再讨论嵌套路由。
const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        meta: {
            needLogin: true
        }
    },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new vueRouter({
    routes, // (缩写) 相当于 routes: routes
    mode: 'history',
})

router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem('token')
    if (token === '2') {
        next()
    } else {

    }
})

export default router