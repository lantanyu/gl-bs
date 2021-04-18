<template>
 <el-container id="home">
	 <el-header>
		 
	 </el-header>
	 
	 <el-main class="clearfix" >
		<div class="divdaohan">
			<el-menu
			  style="min-height: 95vh;"
			  :default-active="activeIndex"
			  router
			  class="el-menu-vertical-demo"
			  background-color="#545c64"
			  text-color="#fff"
			  active-text-color="#4c98e4">
			  <el-menu-item index="/home/ck"><i class="el-icon-menu"></i>冲突介入</el-menu-item>
			  <el-menu-item index="/home/fenlei"><i class="el-icon-guide"></i>分类管理</el-menu-item>
			  <el-menu-item index="/home/product"><i class="el-icon-goods"></i>商品管理</el-menu-item>
			  <el-menu-item index="/home/order"><i class="el-icon-s-order"></i>订单管理</el-menu-item>
			  <el-menu-item index="/home/user"><i class="el-icon-s-custom"></i>人员管理</el-menu-item>
			</el-menu>
		</div>
		<div class="mains">
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
			
		 
	 </el-main>
	 
	 
 </el-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
	mounted() {
	  this.activeIndex = this.$route.path;
	},
	beforeUpdate() {
		this.activeIndex = this.$route.path;
	},
	data() {
		return {
			activeIndex: "",
		}
	}
}
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}
/* 全局CSS */
* {
	padding: 0;
	margin: 0;
	border: 0;
	list-style: none;
}
#home .el-header {
	background-color: #3e3e3e;
	padding: 0;
	height: 5vh !important;
}
#home .el-main {
	padding: 0;
	display: flex;
	background-color: #f9f6f6;
}
#home .el-main .divdaohan{
	width: 200px;
	/* float: left; */
}
#home .el-main .mains{
	/* margin-left: 200px; */
	flex: 1;
	/* background-color: #00FFFF; */
	min-height: 95vh;
}
#home .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */
</style>
