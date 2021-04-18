<template>
	<div id="createfenlei1">
		<el-dialog title="创建一级分类" width="400px" center :visible.sync="iscreatefenlei1s" @open="open" >
			<el-form
			:model="fenlei1"
			:rules="rules"
			status-icon
			ref="ruleForm"
			class="demo-ruleForm"
			>
				<el-form-item label="分类名字"  prop="name">
					<el-input style="width: 260px;"
					  v-model="fenlei1.name"
					  placeholder="请输入分类名字"
					></el-input>
				</el-form-item>
				<el-form-item label="分类描述"  prop="text">
					<el-input style="width: 260px;"
					  v-model="fenlei1.text"
					  placeholder="请输入分类描述"
					></el-input>
				</el-form-item>
			  <el-form-item>
				<el-button size="medium" type="primary" @click="create" style="width:100%;">确定创建</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import {request} from '../myaxios/request.js'
export default {
	name: "createfenlei1",
	props: ["iscreatefenlei1","fenlei1s"],
	data () {
		let namerule = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入分类名字"));
			}
			const Rule = /^.{1,6}$/;
			if (Rule.test(value)) {
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
			} else {
				return callback(new Error("长度1-6之间,"));
			}
		};
		let textrule = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入分类描述"));
			}
			const Rule = /^.{1,50}$/;
			if (Rule.test(value)) {
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
			} else {
				return callback(new Error("长度1-50之间,"));
			}
		};
		return {
			iscreatefenlei1s: false,
			fenlei1: {
				fenlei1id:'',
				name: '',
				text: '',
				status: ''
			},
			rules: {
				name: [{ validator: namerule , trigger: "blur" }],
				text: [{ validator:textrule , trigger: "blur" }],
			}
		}
	},
	watch: {
		iscreatefenlei1 : function(val) {
			if(val) {
				this.iscreatefenlei1s = val
			}
		},
		iscreatefenlei1s: function(val) {
			if (!val) {
				this.$refs["ruleForm"].resetFields();
				this.fenlei1.name = ""
				this.fenlei1.text = ""
				this.fenlei1.status = ""
				this.$emit("setiscreatefenlei1", val);
			}
		}
	},
	methods: {
		open () {
			if(this.fenlei1s!=='') {
				this.fenlei1.fenlei1id = this.fenlei1s.fenlei1id
				this.fenlei1.name = this.fenlei1s.name
				this.fenlei1.text = this.fenlei1s.text
				this.fenlei1.status = this.fenlei1s.status
			}
		},
		createfenlei() {
			request({
				  method: 'post',
				  url: `/product/glbs/creatfenlei1`,
				  data: this.fenlei1,
				  headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.$refs["ruleForm"].resetFields();
					this.$emit("addfenlei1", response.data.data);
					this.iscreatefenlei1s =false
					this.notifySucceed(response.data.message)
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
				console.log(error)
				this.notifyError("连接失败");
			})	
		},
		updata() {
			request({
				  method: 'post',
				  url: `/product/glbs/updatafenlei1`,
				  data: this.fenlei1,
				  headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.fenlei1s.name = this.fenlei1.name
					this.fenlei1s.text = this.fenlei1.text
					this.$refs["ruleForm"].resetFields();
					this.iscreatefenlei1s =false
					this.notifySucceed(response.data.message)
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
				console.log(error)
				this.notifyError("连接失败");
			})	
		},
		create() {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					if(this.fenlei1s!==''){
						this.updata()
					}else {
						this.createfenlei()
					}
				}
				else {
					return false;
				}
			})
		}
	},

}
</script>

<style>
</style>