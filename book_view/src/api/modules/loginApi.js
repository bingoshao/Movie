/**
 * article模块接口列表
 */
import axios from '@/api/http'; // 导入http中创建的axios实例

const loginApi = {
    // post提交
    login(params) {
        return axios.post(`/login`, params);
    }
}

export default loginApi;