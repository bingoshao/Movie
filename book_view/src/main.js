import Vue from 'vue'
import ElementUI from 'element-ui'; //全局引入element-ui
import 'element-ui/lib/theme-chalk/index.css'; //样式文件一定要引入
import App from './App.vue'
import router from './router' // 导入路由文件
import store from './store'
import api from './api' // 导入api接口
import common from './utils/common'
import 'assets/css/global.less'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.$common = common; //将公共方法挂载到vue的原型上

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')