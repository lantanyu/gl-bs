<template>
	<div id="product">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-input size="small" placeholder="请输入内容" v-model.trim="input" style="width: 600px;"  >
		    <el-select style="width: 130px;" v-model="select" slot="prepend" placeholder="请选择">
		      <el-option label="商品名" value="1"></el-option>
		      <el-option label="商品id" value="2"></el-option>
		      <el-option label="用户id" value="3"></el-option>
			  <el-option label="用户名" value="4"></el-option>
			  <el-option label="正常" value="5"></el-option>
			  <el-option label="订单中" value="6"></el-option>
			  <el-option label="已完成" value="7"></el-option>
		    </el-select>
		    <el-button slot="append" @click="getproductlist(1,20,0)" icon="el-icon-search"></el-button>
		</el-input>
		<el-tag class="el-tags" >总数：{{total}}</el-tag>
		<el-table :data="productlist" stripe style="width: 100%" height="80vh">
			<el-table-column type="expand">
				<template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="ID">
							<span>{{ props.row.productid }}</span>
						</el-form-item>
						<el-form-item label="分类">
							<span>{{ props.row.fenlei2id }}</span>
						</el-form-item>
						<el-form-item label="卖家id">
							<span>{{ props.row.userid }}</span>
						</el-form-item>
						<el-form-item label="卖家名">
							<span>{{ props.row.username }}</span>
						</el-form-item>
						<el-form-item label="卖家头像">
							<el-image lazy style="width: 60px;height: 60px;" :src="'http://127.0.0.1:7003/img/'+props.row.usericon" :preview-src-list="['http://127.0.0.1:7003/img/'+props.row.usericon]"></el-image>
						</el-form-item>
						<el-form-item label="图片">
							<el-image lazy style="width: 60px;height: 60px;" :src="props.row.pic[0]" :preview-src-list="props.row.pic"></el-image>
						</el-form-item>
						<el-form-item label="商品名">
							<span>{{ props.row.productidname }}</span>
						</el-form-item>
						<el-form-item label="商品描述">
							<span>{{ props.row.text }}</span>
						</el-form-item>
						<el-form-item label="删除状态">
							<span>{{ props.row.deletestatus }}</span>
						</el-form-item>
						<el-form-item label="商品状态">
							<el-button type="primary" v-if="props.row.productstatus===0" size="mini" >正常的</el-button>
							<el-button type="info" v-if="props.row.productstatus===1" size="mini" >订单中</el-button>
							<el-button type="success" v-if="props.row.productstatus===2" size="mini" >已完成</el-button>
						</el-form-item>
						<el-form-item label="交易方式">
							<el-button type="primary" v-if="props.row.method==0" size="mini" >不包邮</el-button>
							<el-button type="primary" v-if="props.row.method==1" size="mini" >包邮</el-button>
							<el-button type="primary" v-if="props.row.method==2" size="mini" >面交</el-button>
							<el-button type="primary" v-if="props.row.method==3" size="mini" >自提</el-button>
						</el-form-item>
						<el-form-item label="价格">
							<span>{{ props.row.price }}</span>
						</el-form-item>
						<el-form-item label="邮费">
							<span>{{ props.row.baoyouprice }}</span>
						</el-form-item>
						<el-form-item label="地址">
							<span>{{ props.row.city }}</span>
						</el-form-item>
						<el-form-item label="排序分">
							<span>{{ props.row.sort }}</span>
						</el-form-item>
						<el-form-item label="发布时间">
							<span>{{ props.row.fabutime | dateFormat }}</span>
						</el-form-item>
			        </el-form>
			    </template>
			</el-table-column>
			<el-table-column prop="productid" label="ID" width="100"/>
			<el-table-column prop="productidname" label="商品名字"/>
			<el-table-column prop="price" label="价格"/>
			<el-table-column label="商品状态">
				<template slot-scope="scope">
					<el-tag size="mini"  effect="dark" v-if="scope.row.productstatus===0">正常的</el-tag>
					<el-tag size="mini" type="info" effect="dark" v-if="scope.row.productstatus===1">订单中</el-tag>
					<el-tag size="mini" type="success" effect="dark" v-if="scope.row.productstatus===2">已完成</el-tag>
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
			productlist: [],
			total: 0,
			select: "1",
			danqianselect:"",
			input: '',
			danqianinput:''
		}
	},
	mounted() {
		this.getproductlist(1,20,0)
	},
	methods: {
		handleCurrentChange(val) {
			this.getproductlist(val,20,1)
		},
		getproductlist(yie,pianyi,ifs) {
			let bsselect = this.danqianselect
			let bsinput  = this.danqianinput
			let totalbs = this.total
			if(ifs===0){
				this.danqianselect = this.select
				this.danqianinput = this.input
			}
			if(this.danqianselect==="1") {
				let productidname =''
				if(this.danqianinput==="") {
					productidname = "没有数据"
				}else {
					productidname = this.danqianinput
				}
				if(ifs===0){
					this.total =0
				}
				request({
				method: 'get',
				url: `/product/glbs/getproductlist/${yie}/${pianyi}/${productidname}`,
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					let products = response.data.data.list
					products.forEach(product => {
						let arrstr = product.pic.split(';')
						let arrstr2 = []
						arrstr.forEach(str => {
							if(str!=='') {
								str = 'http://127.0.0.1:7003/img/'+str
								arrstr2.push(str)
							}
						})
						product.pic = arrstr2 
					})
					this.productlist = products
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
				let productid=''
				if(rule.test(this.danqianinput)) {
					productid = this.danqianinput
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
				url: `/product/glbs/getproductlistbyproductid/${productid}`,
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					let products = response.data.data.list
					products.forEach(product => {
						let arrstr = product.pic.split(';')
						let arrstr2 = []
						arrstr.forEach(str => {
							if(str!=='') {
								str = 'http://127.0.0.1:7003/img/'+str
								arrstr2.push(str)
							}
						})
						product.pic = arrstr2 
					})
					this.productlist = products
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
			if(this.danqianselect==="3") {
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
				url: `/product/glbs/getproductlistbyuserid/${yie}/${pianyi}/${userid}`,
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					let products = response.data.data.list
					products.forEach(product => {
						let arrstr = product.pic.split(';')
						let arrstr2 = []
						arrstr.forEach(str => {
							if(str!=='') {
								str = 'http://127.0.0.1:7003/img/'+str
								arrstr2.push(str)
							}
						})
						product.pic = arrstr2 
					})
					this.productlist = products
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
			if(this.danqianselect==="4") {
				let username =''
				if(this.danqianinput==="") {
					username = "没有数据"
				}else {
					username = this.danqianinput
				}
				if(ifs===0){
					this.total =0
				}
				request({
				method: 'get',
				url: `/product/glbs/getproductlistbyusername/${yie}/${pianyi}/${username}`,
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					let products = response.data.data.list
					products.forEach(product => {
						let arrstr = product.pic.split(';')
						let arrstr2 = []
						arrstr.forEach(str => {
							if(str!=='') {
								str = 'http://127.0.0.1:7003/img/'+str
								arrstr2.push(str)
							}
						})
						product.pic = arrstr2 
					})
					this.productlist = products
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
			if(this.danqianselect==="5"||this.danqianselect==="6"||this.danqianselect==="7") {
				let productidname =''
				let productstatus =''
				if(this.danqianinput==="") {
					productidname = "没有数据"
				}else {
					productidname = this.danqianinput
				}
				if(this.danqianselect==="5"){
					productstatus =0
				}else if(this.danqianselect==="6") {
					productstatus =1
				}else if(this.danqianselect==="7") {
					productstatus =2
				}
				if(ifs===0){
					this.total =0
				}
				request({
				method: 'get',
				url: `/product/glbs/getproductlistbyproductstatus/${yie}/${pianyi}/${productstatus}/${productidname}`,
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					let products = response.data.data.list
					products.forEach(product => {
						let arrstr = product.pic.split(';')
						let arrstr2 = []
						arrstr.forEach(str => {
							if(str!=='') {
								str = 'http://127.0.0.1:7003/img/'+str
								arrstr2.push(str)
							}
						})
						product.pic = arrstr2 
					})
					this.productlist = products
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
			}
		}
	}
}
</script>

<style>
#product {
	margin-top: 20px;
	margin-left: 20px;
}
#product .el-tags {
	margin-top: 30px;
}
#product .demo-table-expand {
	font-size: 0;
}
#product .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
#product .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
 }
</style>
