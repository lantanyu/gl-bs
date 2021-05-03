<template>
	<div id="fenlei2">
		
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/home/fenlei' }">一级分类管理管理</el-breadcrumb-item>
		  <el-breadcrumb-item>二级分类管理管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-button class="button" @click="updatafenlei('')" >添加二级分类</el-button>
		<el-table :data="fenlei" stripe style="width: 100%">
			<el-table-column prop="fenlei2id" label="ID" width="180"/>
			<el-table-column prop="name" label="姓名" width="180"/> 
			<el-table-column  label="图片" >
				<template slot-scope="scope">
					<el-image style="width: 60px;height: 60px;" :src="'http://127.0.0.1:7003/img/'+scope.row.icon" :preview-src-list="['http://127.0.0.1:7003/img/'+scope.row.icon]"></el-image>
			    </template>
			</el-table-column>
			<el-table-column  label="状态">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="change(scope.row.fenlei2id,scope.row.status)"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column fixed="right" width="130px" label="操作" >
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="updatafenlei(scope.row)">修改</el-button>
			    </template>
			</el-table-column>
		</el-table>
		
		<createfenlei2 :iscreatefenlei2="iscreatefenlei2" :fenlei2s="fenlei2" :fenlei1id="fenlei1id" @setiscreatefenlei2 ="setiscreatefenlei2" @addfenlei2="addfenlei2"></createfenlei2>
	</div>
</template>

<script>
import {request} from '../myaxios/request.js'
import createfenlei2 from '../components/createfenlei2.vue'
export default {
	components: {
		createfenlei2,
	},
	activated() {
		if (this.$route.query.fenlei1id != undefined) {
			this.fenlei = this.getfenlei(this.$route.query.fenlei1id)
			return;
		}
	},
	data() {
	    return {
			fenlei: [],
			iscreatefenlei2: false,
			fenlei2: '',
			fenlei1id: ''
	    }
	},
	methods: {
		getfenlei(fenlei1id) {
			request({
				  method: 'get',
				  url: `/product/all/getfenlei2/${fenlei1id}`,
				  headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					if(response.data.code==200){
						if(response.data.data.length!=0){
							this.fenlei1id = response.data.data[0].fenlei1id
							this.fenlei = response.data.data
						}else {
							this.fenlei = response.data.data
							this.fenlei1id = this.$route.query.fenlei1id
						}
						
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
				  console.log(error)
				  this.notifyError("连接失败");
				})	
		},
		change(id,val) {
			console.log(id)
			console.log(val)
			request({
				  method: 'post',
				  url: `/product/glbs/updatafenlei2status`,
				  data: {fenlei2id: id,status: val},
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
		addfenlei2(val) {
			this.fenlei.push(val)
		},
		setiscreatefenlei2 (val) {
			this.iscreatefenlei2 = val
		},
		updatafenlei(val) {
			this.fenlei2 = val
			this.iscreatefenlei2 = true
		}
	}
}
</script>

<style>
#fenlei2 {
	margin-top: 20px;
	margin-left: 20px;
}
#fenlei2 .button {
	margin-top: 30px;
}
</style>