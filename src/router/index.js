import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import fenlei from '../views/fenlei.vue'
import fenlei2 from '../views/fenlei2.vue'
import product from '../views/product.vue'
import user from '../views/user.vue'
import order from '../views/order.vue'
import ck from '../views/ck.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
	children: [
	  {
		path: '/home/ck',
		name: 'ck',
		component: ck,
		meta: {
			requireAuth: true // 需要验证登录状态
		}
	  },
	  {
	    path: '/home/fenlei',
		name: 'fenlei',
	    component: fenlei,
		meta: {
		  requireAuth: true // 需要验证登录状态
		}
	  },
	  {
	    path: '/home/product',
	  	name: 'product',
	    component: product,
		meta: {
		  requireAuth: true // 需要验证登录状态
		}
	  },
	  {
	    path: '/home/order',
	  	name: 'order',
	    component: order,
	  		meta: {
	  		  requireAuth: true // 需要验证登录状态
	  		}
	  },
	  {
	    path: '/home/user',
	  	name: 'user',
	    component: user,
		meta: {
		  requireAuth: true // 需要验证登录状态
		}
	  },
	  {
	    path: '',
	    redirect: '/home/ck'
	  },
	  {
	    path: '/home/fenlei2',
	  	name: 'fenlei2',
	    component: fenlei2,
		meta: {
		  requireAuth: true // 需要验证登录状态
		}
	  },
	],
	meta: {
	  requireAuth: true // 需要验证登录状态
	}
  },
  {
    path: '/',
    redirect: '/denru'
  },
  {
    path: '/denru',
    name: 'denru',
    component: () => import(/* webpackChunkName: "about" */ '../views/denru.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
