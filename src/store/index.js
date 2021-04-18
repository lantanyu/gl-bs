import Vue from 'vue'
import Vuex from 'vuex'
import {request} from '../myaxios/request.js'
import router from '../router/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user:''
	},
	mutations: {
		denru (state, {user}) {
			  state.user = user
			  router.push({ path: "/home" })
		},
	},
	actions: {
		denru ({commit},{user}) {
			request({
			  method: 'post',
			  url: '/user/glbs/gldenru',
			  data: user,
			  headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200) {
					let user = response.data.data
					window.localStorage.setItem('token', response.data.data.token)
					let userstr = JSON.stringify(user);
					window.localStorage.setItem("auser", userstr);
					Vue.prototype.notifySucceed(response.data.message)
					commit('denru',{user})
				}else {
					Vue.prototype.notifyError(response.data.message)
				}
			}).catch((error) => {
			    console.log(error)
			    Vue.prototype.notifyError("连接失败")
			})
		},
	},
	modules: {
	}
})
