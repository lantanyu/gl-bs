<template>
	<div id="ck">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>冲突处理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-input size="small" placeholder="请输入内容" v-model.trim="input" style="width: 600px;"  >
			<el-select style="width: 130px;" v-model="select" slot="prepend" placeholder="请选择">
			  <el-option label="正常" value="1"></el-option>
			  <el-option label="用户ID" value="2"></el-option>
			  <el-option label="申请ID"  value="3"></el-option>
			  <el-option label="订单ID"  value="4"></el-option>
			  <el-option label="待解决" value="5"></el-option>
			  <el-option label="已解决" value="6"></el-option>
			  <el-option label="拒绝" value="7"></el-option>
			  <el-option label="取消" value="8"></el-option>
			
			</el-select>
			<el-button slot="append" @click="getcklist(1,20,0)" icon="el-icon-search"></el-button>
		</el-input>
		<el-tag  class="el-tags">总数：{{total}}</el-tag>
		<el-table :data="cklist" stripe style="width: 100%" height="80vh">
			<el-table-column prop="ckid" width="100" label="申请ID"></el-table-column>
			<el-table-column prop="orderid" width="100" label="订单ID"></el-table-column>
			<el-table-column prop="userid" width="100" label="申请人ID"></el-table-column>
			<el-table-column prop="text" width="300" label="原因"></el-table-column>
			<el-table-column label="情况">
				<template slot-scope="scope" >
					<el-tag size="mini" type="primary" effect="plain"  v-if="scope.row.cx===0">正常</el-tag>
					<el-tag size="mini" type="info" effect="plain" v-if="scope.row.cx===1">取消</el-tag>
				</template>
			</el-table-column>
			<el-table-column  label="状态">
				<template slot-scope="scope" >
					<el-tag size="mini" type="info" effect="plain" v-if="scope.row.status===0">待解决</el-tag>
					<el-tag size="mini" type="warning" effect="plain" v-if="scope.row.status===1">拒绝请求</el-tag>
					<el-tag size="mini" type="success" effect="plain" v-if="scope.row.status===2">已解决</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" width="200px" label="操作" >
				<template slot-scope="scope">
					<el-button type="danger" v-if="scope.row.status===0&&scope.row.cx===0" size="mini" @click="updateck(scope.row,1)">拒绝</el-button>
					<el-button type="success" v-if="scope.row.status===0&&scope.row.cx===0" size="mini" @click="updateck(scope.row,2)">解决</el-button>
			    </template>
			</el-table-column>
		</el-table>
		
		<div  style="text-align: center; margin-top: 10px;">
			<el-pagination background layout="prev, pager, next" :page-size="20" :total="total" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import {request} from '../myaxios/request.js'
export default {
	data() {
		return {
			cklist: [],
			total: 0,
			select: "1",
			danqianselect:"",
			input: '',
			danqianinput:''
		}
	},
	mounted() {
		this.getcklist(1,20,0)
	},
	methods: {
		handleCurrentChange(val) {
			this.getcklist(val,20,1)
		},
		getcklist(yie,pianyi,ifs) {
			let bsselect = this.danqianselect
			let bsinput  = this.danqianinput
			let totalbs = this.total
			let datas =''
			const rule = /^[0-9]{1,}$/
			if(ifs===0){
				this.danqianselect = this.select
				this.danqianinput = this.input
			}
			if(this.danqianselect==="1") {
				datas ={cx:0}
			}else if(this.danqianselect==="2") {
				if(rule.test(this.danqianinput)) {
					datas = {userid: this.danqianinput}
				}else {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.notifyError("请输入id");
					return
				}
			}else if(this.danqianselect==="3") {
				if(rule.test(this.danqianinput)) {
					datas = {ckid: this.danqianinput}
				}else {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.notifyError("请输入id");
					return
				}
			}else if(this.danqianselect==="4") {
				if(rule.test(this.danqianinput)) {
					datas = {orderid: this.danqianinput}
				}else {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.notifyError("请输入id");
					return
				}
			}else if(this.danqianselect==="5"||this.danqianselect==="6"||this.danqianselect==="7") {
				if(this.danqianselect==="5"){
					datas = {status: 0,cx:0}
				}else if(this.danqianselect==="6") {
					datas = {status: 2,cx:0}
				}else if(this.danqianselect==="7") {
					datas = {status: 1,cx:0}
				}
			}else if(this.danqianselect==="8") {
				datas = {cx:1}
			}
			
			if(ifs===0){
				this.total =0
			}
			request({
				method: 'post',
				url: `/order/getcklist/${yie}/${pianyi}`,
				data:datas,
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.cklist = response.data.data.list
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
		},
		updateck(ck,status,ifs) {
			request({
				method: 'post',
				url: `/order/glbs/updateck`,
				data:{ckid:ck.ckid,status:status},
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.notifySucceed(response.data.message)
					ck.status = status
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
				console.log(error)
				this.notifyError("连接失败");
			})
		}
	}
}
</script>

<style>
#ck {
	margin-top: 20px;
	margin-left: 20px;
}
#ck .el-tags {
	margin-top: 30px;
}
</style>
