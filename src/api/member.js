import axios from '../http'

export default {
    getList() {
        return axios({
            url:'/member/list/',
            method:'get'
        });
    }
}