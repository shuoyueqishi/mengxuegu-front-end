/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from './store/store'
import * as types from './store/types'
import router from './router'
import {Loading,Message} from 'element-ui'


let loading;
//内存中正在请求的数量
let loadingNum=0;
function startLoading() {    
	if(loadingNum==0){
		loading = Loading.service({
		  lock: true,
		  text: 'loading...',
		  background:'rgba(0,0,0,0.5)',
		})
	}
	//请求数量加1
  loadingNum++;
  console.log("LodingNum="+loadingNum);
}
function endLoading() {
    //请求数量减1
  loadingNum--;
  console.log("LodingNum="+loadingNum);
	if(loadingNum<=0){
		loading.close()
	}
}

// axios 配置
axios.defaults.timeout = 5000;
// process.env.VUE_APP_BASE_API=dev-api
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    startLoading();
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    endLoading();
    return Promise.reject(err)
  },
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    endLoading()
    return response
  },
  error => {
    endLoading()
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path },
            });
            break;
          default :
             Message({
               message: 'Http code: '+error.response.status,
               type: 'error',
               duration: 5000
             }) 
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  },
);

export default axios
