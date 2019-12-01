import axios from '../http'

export default {
    getList() {
        return axios({
            url:'/member/list',
           // url:'/employee/getList',
            method:'get'
        });
    }
}