<template>
	<div id="user">
		<el-breadcrumb  separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		
		<el-input size="small" placeholder="请输入内容" v-model.trim="input" style="width: 600px;"  >
		    <el-select style="width: 130px;" v-model="select" slot="prepend" placeholder="请选择">
		      <el-option label="名字" value="1"></el-option>
		      <el-option label="id"  value="2"></el-option>
		      <el-option label="正常" value="3"></el-option>
			  <el-option label="封禁" value="4"></el-option>
			  <el-option label="注销" value="5"></el-option>
		    </el-select>
		    <el-button slot="append" @click="getuserlist(1,10,0)" icon="el-icon-search"></el-button>
		</el-input>
		<el-tag class="el-tags" >总数：{{total}}</el-tag>
		<el-table :data="userlist" stripe style="width: 100%" height="80vh">
			<el-table-column prop="userid" label="ID" width="100"/>
			<el-table-column prop="username" label="用户名"/>
			<el-table-column prop="password" label="密码"/>
			<el-table-column prop="name" label="名字"/>
			<el-table-column prop="phone" label="电话"/>
			<el-table-column label="头像">
				<template slot-scope="scope">
					<el-image style="width: 60px;height: 60px;" :src="'http://127.0.0.1:7003/img/'+scope.row.icon" :preview-src-list="['http://127.0.0.1:7003/img/'+scope.row.icon]"></el-image>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" width="180">
			    <template slot-scope="scope">
			        {{ scope.row.createtime | dateFormat }}
			    </template>
			</el-table-column>
			<el-table-column label="性别" >
			    <template slot-scope="scope">
			        <span v-if="scope.row.gender===0">男</span>
					<span v-if="scope.row.gender===1">女</span>
			    </template>
			</el-table-column>
			<el-table-column prop="xingyongfen" label="信用分"/>
			<el-table-column prop="city" label="地区"/>
			<el-table-column prop="status" label="状态"/>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<el-tag size="mini"  effect="plain" v-if="scope.row.status===0">正常</el-tag>
					<el-tag size="mini" type="info" effect="plain" v-if="scope.row.status===1">注销</el-tag>
					<el-tag size="mini" type="danger" effect="plain" v-if="scope.row.status===2">封禁</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" width="200px" label="操作" >
				<template slot-scope="scope">
					<el-button type="danger" v-if="scope.row.status===0" size="mini" @click="fjuser(scope.row,2)">封禁</el-button>
					<el-button type="success" v-if="scope.row.status===2" size="mini" @click="fjuser(scope.row,0)">解封</el-button>
			    </template>
			</el-table-column>
		</el-table>
		
		<div  style="text-align: center; margin-top: 10px;">
			<el-pagination background layout="prev, pager, next" :page-size="10" :total="total" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import {request} from '../myaxios/request.js'
export default {
	data() {
		return {
			userlist: [],
			total: 0,
			select: "1",
			danqianselect:"",
			input: '',
			danqianinput:''
		}
	},
	mounted() {
		this.getuserlist(1,10,0)
	},
	methods: {
		handleCurrentChange(val) {
			this.getuserlist(val,10,1)
		},
		fjuser(user,status) {
			request({
				method: 'post',
				url: `/user/glbs/fjuser`,
				data: {userid:user.userid,status: status},
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.notifySucceed(response.data.message)
					user.status = status
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
				console.log(error)
				this.notifyError("连接失败");
			})	
		},
		getuserlist(yie,pianyi,ifs) {
			let bsselect = this.danqianselect
			let bsinput  = this.danqianinput
			let totalbs = this.total
			if(ifs===0){
				this.danqianselect = this.select
				this.danqianinput = this.input
			}
			if(this.danqianselect==="1") {
				let name =''
				if(this.danqianinput==="") {
					name = "没有数据"
				}else {
					name = this.danqianinput
				}
				if(ifs===0){
					this.total =0
				}
				request({
					method: 'get',
					url: `/user/glbs/getuserlist/${yie}/${pianyi}/${name}`,
					headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					if(response.data.code==200){
						this.userlist = response.data.data.list
						this.total = response.data.data.total
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.total = totalbs
					console.log(error)
					this.notifyError("连接失败");
				})	
				return
			}
			if(this.danqianselect==="2") {
				const rule = /^[0-9]{1,}$/
				let userid=''
				if(rule.test(this.danqianinput)) {
					userid = this.danqianinput
				}else {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.notifyError("请输入id");
					return
				}
				if(ifs===0){
					this.total =0
				}
				request({
					method: 'get',
					url: `/user/glbs/getuserlistbyid/${userid}`,
					headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					if(response.data.code==200){
						this.userlist = response.data.data.list
						this.total = response.data.data.total
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.total = totalbs
					console.log(error)
					this.notifyError("连接失败");
				})	
				return
			}
			if(this.danqianselect==="3"||this.danqianselect==="4"||this.danqianselect==="5") {
				let name =''
				let status =''
				if(this.danqianinput==="") {
					name = "没有数据"
				}else {
					name = this.danqianinput
				}
				if(this.danqianselect==="3"){
					status =0
				}else if(this.danqianselect==="4") {
					status =1
				}else if(this.danqianselect==="5") {
					status =2
				}
				if(ifs===0){
					this.total =0
				}
				request({
					method: 'get',
					url: `/user/glbs/getuserlistbystatus/${yie}/${pianyi}/${status}/${name}`,
					headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					if(response.data.code==200){
						this.userlist = response.data.data.list
						this.total = response.data.data.total
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.total = totalbs
					console.log(error)
					this.notifyError("连接失败");
				})	
				return
			}
			
		}
	}
}
</script>

<style>
#user{
	margin-top: 20px;
	margin-left: 20px;
}
#user .el-tags {
	margin-top: 30px;
}
</style>
