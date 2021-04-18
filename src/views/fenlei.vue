<template>
	<div id="fenlei">
		
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>一级分类管理管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-button class="button" @click="updatafenlei('')" >添加一级分类</el-button>
		<el-table :data="fenlei" stripe style="width: 100%">
			<el-table-column prop="fenlei1id" label="ID" width="180"/>
			<el-table-column prop="name" label="姓名" width="180"/> 
			<el-table-column prop="text" label="描述"/>
			<el-table-column  label="状态">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="change(scope.row.fenlei1id,scope.row.status)"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column fixed="right" width="130px" label="操作" >
			    <template slot-scope="scope">
			        <el-button type="text" size="small" @click="gofenlei2(scope.row.fenlei1id)">二级</el-button>
					<el-button type="text" size="small" @click="updatafenlei(scope.row)">修改</el-button>
			    </template>
			</el-table-column>
		</el-table>
		
		<createfenlei1 :iscreatefenlei1="iscreatefenlei1" :fenlei1s="fenlei1" @setiscreatefenlei1 ="setiscreatefenlei1" @addfenlei1="addfenlei1"></createfenlei1>
	</div>
</template>

<script>
import {request} from '../myaxios/request.js'
import createfenlei1 from '../components/createfenlei1.vue'
export default {
	components: {
		createfenlei1,
	},
	activated() {
		this.getfenlei()
	},
	data() {
	    return {
			fenlei: [],
			iscreatefenlei1: false,
			fenlei1: ''
	    }
	},
	methods: {
		getfenlei() {
			request({
				  method: 'get',
				  url: `/product/glbs/getfenlei1s`,
				  headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					if(response.data.code==200){
						this.fenlei = response.data.data
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
				  console.log(error)
				  this.notifyError("连接失败");
				})	
		},
		gofenlei2(fenlei1id) {
			this.$router.push({path: "/home/fenlei2",query: { fenlei1id: fenlei1id }})
		},
		change(id,val) {
			console.log(id)
			console.log(val)
			request({
				  method: 'post',
				  url: `/product/glbs/updatafenlei1status`,
				  data: {fenlei1id: id,status: val},
				  headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					if(response.data.code==200){
						this.notifySucceed(response.data.message);
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
				  console.log(error)
				  this.notifyError("连接失败");
				})	
		},
		addfenlei1(val) {
			this.fenlei.push(val)
		},
		setiscreatefenlei1 (val) {
			this.iscreatefenlei1 = val
		},
		updatafenlei(val) {
			this.fenlei1 = val
			this.iscreatefenlei1 = true
		}
	}
}
</script>

<style>
#fenlei {
	margin-top: 20px;
	margin-left: 20px;
}
#fenlei .button {
	margin-top: 30px;
}
</style>
