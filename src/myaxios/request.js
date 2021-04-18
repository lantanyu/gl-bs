import axios from 'axios'
import store from '../store/index.js'
import Vue from 'vue'
import router from '../router/index.js'
export function request(config) {
	const instance = axios.create({
		//baseURL:'http://192.168.58.133:1111'
		baseURL:'http://127.0.0.1:7101'
	})
	
	instance.interceptors.request.use(
	config => {
		//window.localStorage.setItem('token', 'shiyan')
		let path = config.url
		let zhenzhe = /\/all/
		let zhenzhe2 = /\/gldenru/
		if(!zhenzhe.test(path)&&!zhenzhe2.test(path)) { 
			if(config.headers.token==null&&config.headers.token==undefined) {
				Vue.prototype.notifyError("未登入")
				router.push({ path: "/denru" })
				return 
			}
		}
		return config
	},
	error => {
	  // 跳转error页面
	  //router.push({ path: "/error" })
	  return Promise.reject(error)
	}
	)
	
	instance.interceptors.response.use(
	  res => {
	    return res;
	  },
	  error => {
		console.log(error.response.status)
		console.log(error.response.config)
		if (error.response.status == "406") {
		  Vue.prototype.notifyError(error.response.data.message);
		  router.push({ path: "/denru" })
		}
	    return Promise.reject(error);
	  }
	);
	
	return instance(config)
}