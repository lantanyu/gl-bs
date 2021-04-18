<template>
	<div id="order">
		<el-breadcrumb  separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-input size="small" placeholder="请输入内容" v-model.trim="input" style="width: 600px;"  >
		    <el-select style="width: 130px;" v-model="select" slot="prepend" placeholder="请选择">
		      <el-option label="商品名字" value="1"></el-option>
		      <el-option label="商品ID"  value="2"></el-option>
		      <el-option label="买家ID" value="3"></el-option>
			  <el-option label="卖家ID" value="4"></el-option>
			  <el-option label="订单ID" value="5"></el-option>
			  <el-option label="订单编号" value="6"></el-option>
			  <el-option label="待付款" value="7"></el-option>
			  <el-option label="待发货" value="8"></el-option>
			  <el-option label="待收货" value="9"></el-option>
			  <el-option label="待确定" value="10"></el-option>
			  <el-option label="交易关闭" value="11"></el-option>
			  <el-option label="交易完成" value="12"></el-option>
			  <el-option label="交易退货" value="13"></el-option>
			  <el-option label="转入人工" value="14"></el-option>
		    </el-select>
		    <el-button slot="append" @click="getorderlist(1,20,0)" icon="el-icon-search"></el-button>
		</el-input>
		<el-tag class="el-tags" >总数：{{total}}</el-tag>
		<el-table :data="orderlist" stripe style="width: 100%" height="80vh">
			<el-table-column type="expand">
				<template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="订单ID">
							<span>{{ props.row.orderid }}</span>
						</el-form-item>
						<el-form-item label="商品ID">
							<span>{{ props.row.productid }}</span>
						</el-form-item>
						<el-form-item label="买家ID">
							<span>{{ props.row.userid }}</span>
						</el-form-item>
						<el-form-item label="订单编号">
							<span>{{ props.row.sn }}</span>
						</el-form-item>
						<el-form-item label="邮价">
							<span>{{ props.row.baoyouprice }}</span>
						</el-form-item>
						<el-form-item label="价格">
							<span>{{ props.row.price }}</span>
						</el-form-item>
						<el-form-item label="商品名">
							<span>{{ props.row.productname }}</span>
						</el-form-item>
						<el-form-item label="交易方式">
							<el-button type="primary" v-if="props.row.method==0" size="mini" plain>不包邮</el-button>
							<el-button type="primary" v-if="props.row.method==1" size="mini" plain>包邮</el-button>
							<el-button type="primary" v-if="props.row.method==2" size="mini" plain>面交</el-button>
							<el-button type="primary" v-if="props.row.method==3" size="mini" plain>自提</el-button>
						</el-form-item>
						<el-form-item label="订单状态">
							<el-button type="primary" v-if="props.row.status==0" size="mini" plain>待付款</el-button>
							<el-button type="primary" v-if="props.row.status==1" size="mini" plain>待发货</el-button>
							<el-button type="primary" v-if="props.row.status==2" size="mini" plain>待收货</el-button>
							<el-button type="primary" v-if="props.row.status==3" size="mini" plain>待确定</el-button>
							<el-button type="primary" v-if="props.row.status==4" size="mini" plain>支付超时</el-button>
							<el-button type="primary" v-if="props.row.status==5" size="mini" plain>交易完成</el-button>
							<el-button type="primary" v-if="props.row.status==7" size="mini" plain>转入人工</el-button>
							<el-popover id="ddb" placement="right" width="1000" trigger="click" >
								<el-form label-position="left" inline class="popover-from">
									<el-form-item  label="退货ID">
										<span>{{byorder.byorderid}}</span>
									</el-form-item>
									<el-form-item label="编号">
										<span>{{byorder.sn}}</span>
									</el-form-item>
									<el-form-item label="运费">
										<span>{{byorder.yunprice}}</span>
									</el-form-item>
									<el-form-item label="是否包邮">
										<span v-if="byorder.methon===1">是</span>
										<span v-if="byorder.methon===0">否</span>
									</el-form-item>
									<el-form-item label="状态">
										<span v-if="byorder.status===0">申请退货</span>
										<span v-if="byorder.status===1">待发货</span>
										<span v-if="byorder.status===2">待收货</span>
										<span v-if="byorder.status===3">完成</span>
									</el-form-item>
									<el-form-item label="收货人">
										<span>{{byorder.addressname}}</span>
									</el-form-item>
									<el-form-item label="电话">
										<span>{{byorder.phone}}</span>
									</el-form-item>
									<el-form-item label="省">
										<span>{{byorder.province}}</span>
									</el-form-item>
									<el-form-item label="市">
										<span>{{byorder.city}}</span>
									</el-form-item>
									<el-form-item label="区">
										<span>{{byorder.region}}</span>
									</el-form-item>
									<el-form-item label="详细地址">
										<span>{{byorder.detailaddresss}}</span>
									</el-form-item>
									<el-form-item label="添加时间">
										<span>{{byorder.tijiaotime}}</span>
									</el-form-item>
									<el-form-item label="发货时间">
										<span>{{byorder.fahuotime}}</span>
									</el-form-item>
									<el-form-item label="收货时间">
										<span>{{byorder.sohuotime}}</span>
									</el-form-item>
									<el-form-item label="删除状态">
										<span v-if="byorder.delectstatus===1">正常</span>
										<span v-if="byorder.delectstatus===0">删除</span>
									</el-form-item>
									<el-form-item label="订单单号">
										<span>{{byorder.orderid}}</span>
									</el-form-item>
									<el-form-item label="退货原因">
										<span>{{byorder.tuihuotext}}</span>
									</el-form-item>
									<el-form-item label="快递公司">
										<span>{{byorder.kuidihao}}</span>
									</el-form-item>
									<el-form-item label="快递号">
										<span>{{byorder.kuidi}}</span>
									</el-form-item>
									
								</el-form>
								<el-button type="primary" v-if="props.row.status==6" size="mini" @click="orderid=props.row.orderid" slot="reference">退货详细</el-button>
							</el-popover>
						</el-form-item>
						
						<el-form-item label="收货人">
							<span>{{ props.row.addressname }}</span>
						</el-form-item>
						<el-form-item label="省">
							<span>{{ props.row.province }}</span>
						</el-form-item>
						<el-form-item label="市">
							<span>{{ props.row.city }}</span>
						</el-form-item>
						<el-form-item label="区">
							<span>{{ props.row.region }}</span>
						</el-form-item>
						<el-form-item label="详细地址">
							<span>{{ props.row.detailaddresss }}</span>
						</el-form-item>
						<el-form-item label="电话">
							<span>{{ props.row.phone }}</span>
						</el-form-item>
						<el-form-item label="添加时间">
							<span>{{ props.row.tijiaotime | dateFormat }}</span>
						</el-form-item>
						<el-form-item label="支付时间">
							<span>{{ props.row.zhifutime | dateFormat }}</span>
						</el-form-item>
						<el-form-item label="发货时间">
							<span>{{ props.row.fahuotime | dateFormat }}</span>
						</el-form-item>
						<el-form-item label="收货时间">
							<span>{{ props.row.sohuotime | dateFormat }}</span>
						</el-form-item>
						<el-form-item label="删除状态">
							<el-button type="primary" v-if="props.row.delectstatus==0" size="mini" plain>已删除</el-button>
							<el-button type="primary" v-if="props.row.delectstatus==1" size="mini" plain>正常</el-button>
						</el-form-item>
						<el-form-item label="快递号">
							<span>{{ props.row.kuidihao }}</span>
						</el-form-item>
						<el-form-item label="卖家ID">
							<span>{{ props.row.byuserid }}</span>
						</el-form-item>
						<el-form-item label="快递公司">
							<span>{{ props.row.kuidi }}</span>
						</el-form-item>
			        </el-form>
			    </template>
			</el-table-column>
			<el-table-column prop="orderid" label="ID" width="100"/>
			<el-table-column prop="sn" label="订单编号"/>
			<el-table-column prop="productname" label="商品名字"/>
			<el-table-column prop="price" label="价格"/>
			<el-table-column prop="status" label="状态">
				<template slot-scope="scope" >
					<!-- success/info/warning/danger -->
					<el-tag size="mini" type="danger"  effect="plain" v-if="scope.row.status==0">待付款</el-tag>
					<el-tag size="mini" type="warning" effect="plain" v-if="scope.row.status==1">待发货</el-tag>
					<el-tag size="mini" type="info" effect="plain" v-if="scope.row.status==2">待收货</el-tag>
					<el-tag size="mini" type="warning" effect="plain" v-if="scope.row.status==3">待确定</el-tag>
					<el-tag size="mini" type="info" effect="plain" v-if="scope.row.status==4">支付超时</el-tag>
					<el-tag size="mini" type="success" effect="plain" v-if="scope.row.status==5">交易完成</el-tag>
					<el-tag size="mini" type="warning" effect="plain" v-if="scope.row.status==6">交易退货</el-tag>
					<el-tag size="mini" type="danger" effect="plain" v-if="scope.row.status==7">转入人工</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" width="200px" label="操作" >
				<template slot-scope="scope">
					<el-button type="danger" v-if="scope.row.status!==5&&scope.row.status!==7" size="mini" @click="rengong(scope.row)">转入人工</el-button>
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
			orderlist: [],
			total: 0,
			select: "1",
			danqianselect:"",
			input: '',
			danqianinput:'',
			byorder: "",
			orderid: 0
		}
	},
	mounted() {
		this.getorderlist(1,20,0)
	},
	methods: {
		
		handleCurrentChange(val) {
			this.getorderlist(val,20,1)
		},
		getorderlist(yie,pianyi,ifs){
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
				
				datas = {productname: this.danqianinput}
			}else if(this.danqianselect==="2") {
				if(rule.test(this.danqianinput)) {
					datas = {productid: this.danqianinput}
				}else {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.notifyError("请输入id");
					return
				}
			}else if(this.danqianselect==="3") {
				if(rule.test(this.danqianinput)) {
					datas = {userid: this.danqianinput}
				}else {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.notifyError("请输入id");
					return
				}
			}else if(this.danqianselect==="4") {
				if(rule.test(this.danqianinput)) {
					datas = {byuserid: this.danqianinput}
				}else {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.notifyError("请输入id");
					return
				}
			}else if(this.danqianselect==="5") {
				if(rule.test(this.danqianinput)) {
					datas = {orderid: this.danqianinput}
				}else {
					this.danqianselect = bsselect
					this.danqianinput = bsinput
					this.notifyError("请输入id");
					return
				}
			}else if(this.danqianselect==="6") {
				datas = {sn: this.danqianinput}
			}else if(this.danqianselect==="7"||this.danqianselect==="8"||this.danqianselect==="9"||this.danqianselect==="10"||this.danqianselect==="11"||this.danqianselect==="12"||this.danqianselect==="13"||this.danqianselect==="14") {
				if(this.danqianselect==="7"){
					datas = {status: 0,productname: this.danqianinput}
				}else if(this.danqianselect==="8") {
					datas = {status: 1,productname: this.danqianinput}
				}else if(this.danqianselect==="9") {
					datas = {status: 2,productname: this.danqianinput}
				}else if(this.danqianselect==="10") {
					datas = {status: 3,productname: this.danqianinput}
				}else if(this.danqianselect==="11") {
					datas = {status: 4,productname: this.danqianinput}
				}else if(this.danqianselect==="12") {
					datas = {status: 5,productname: this.danqianinput}
				}else if(this.danqianselect==="13") {
					datas = {status: 6,productname: this.danqianinput}
				}
				else if(this.danqianselect==="14") {
					datas = {status: 7,productname: this.danqianinput}
				}
			}
			if(ifs===0){
				this.total =0
			}
			
			request({
				method: 'post',
				url: `/order/glbs/getorderlist/${yie}/${pianyi}`,
				data: datas,
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.orderlist = response.data.data.list
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
		getbyorder(orderid) {
			request({
				method: 'get',
				url: `/order/getbyorder/${orderid}`,
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.byorder = response.data.data
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
				console.log(error)
				this.notifyError("连接失败");
			})
		},
		rengong(order) {
			let orderid = order.orderid
			request({
				method: 'post',
				url: `/order/glbs/rengong/${orderid}`,
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					order.status = 7
					this.notifySucceed(response.data.message)
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
				console.log(error)
				this.notifyError("连接失败");
			})
		}
	},
	watch: {
		orderid: function (val) {
			this.getbyorder(val)
		}
	}
}
</script>

<style>
#order{
	margin-top: 20px;
	margin-left: 20px;
}
#order .el-tags {
	margin-top: 30px;
}
#order .demo-table-expand {
	font-size: 0;
}
#order .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
#order .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
 }
.popover-from {
	font-size: 0;
}
.popover-from label {
	width: 90px;
	color: #99a9bf;
}
.popover-from .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 43%;
}
</style>
