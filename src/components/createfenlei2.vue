<template>
	<div id="createfenlei2">
		<el-dialog title="创建二级分类" width="400px" center :visible.sync="iscreatefenlei2s" @open="open" >
			<el-form
			:model="fenlei2"
			:rules="rules"
			status-icon
			ref="ruleForm"
			class="demo-ruleForm"
			>
				<el-form-item label="分类名字"  prop="name">
					<el-input style="width: 260px;"
					  v-model="fenlei2.name"
					  placeholder="请输入分类名字"
					></el-input>
				</el-form-item>
				
				<el-upload
				  ref="upload"
				  multiple
				  :limit="1"
				  action="http:xxx/uploads"
				  list-type="picture-card"
				  :on-remove="handleRemove"
				  :http-request="uploadFile"
				  :file-list="fileList"
				  accept=".jpg, .jpeg, .png, .gif"   
				  :on-change="beforeUpload"   
				  :on-exceed="exceed" 
				  :auto-upload="false">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
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
	name: "createfenlei2",
	props: ["iscreatefenlei2","fenlei2s","fenlei1id"],
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
		
		return {
			iscreatefenlei2s: false,
			fenlei2: {
				fenlei2id:'',
				fenlei1id: '',
				name: '',
				status: ''
			},
			fileData: '',
			fileList: [],
			dialogImageUrl: '',
			dialogVisible: false,
			rules: {
				name: [{ validator: namerule , trigger: "blur" }],
			}
		}
	},
	watch: {
		iscreatefenlei2 : function(val) {
			if(val) {
				this.iscreatefenlei2s = val
			}
		},
		iscreatefenlei2s: function(val) {
			if (!val) {
				this.$refs["ruleForm"].resetFields();
				this.fenlei2 = {fenlei2id:'',fenlei1id: '',name: '',status: ''}
				this.fileList =[]
				this.$emit("setiscreatefenlei2", val);
			}
		}
	},
	methods: {
		open () {
			this.fenlei2.fenlei1id = this.fenlei1id 
			if(this.fenlei2s!=='') {
				this.fenlei2.fenlei2id = this.fenlei2s.fenlei2id
				this.fenlei2.name = this.fenlei2s.name
				this.fenlei2.status = this.fenlei2s.status
				if(this.fenlei2s.icon!=null){
					this.fileList.push({name:'xxx.jqg',url:'http://127.0.0.1:7003/img/'+this.fenlei2s.icon})
				}
			}
		},
		create() {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					if(this.fenlei2s!==''){
						this.updatafenlei()
					}else {
						this.createfenlei()
					}
					
				}
				else {
					return false;
				}
			})
		},
		createfenlei() {
			if(this.fileList.length==0){
				this.notifyError("至少一张图片");
				return false;
			}else {
				this.fileData = new FormData()
				this.$refs.upload.submit()
				this.fileData.append('fenlei1id',this.fenlei2.fenlei1id)
				this.fileData.append('name',this.fenlei2.name)
				request({
				  method: 'post',
				  url: '/product/glbs/creatfenlei2',
				  headers: {'token': window.localStorage.getItem('token')},
				  data: this.fileData
				}).then(response => {
					console.log(response.data.code)
					if(response.data.code==200){
						this.notifySucceed(response.data.message);
						this.$emit("addfenlei2", response.data.data);
						this.$refs["ruleForm"].resetFields();
						this.fileList =[]
						this.iscreatefenlei2s = false
						
					}else {
						this.notifyError(response.data.message);
					}
					this.fileList = []
				}).catch((error) => {
				  console.log(error)
				  alert('连接失败')
				})	
			}
		},
		updatafenlei() {
			this.fileData = new FormData()
			this.$refs.upload.submit()
			let json = JSON.stringify(this.fenlei2);
			this.fileData.append('json',json)
			request({
			  method: 'post',
			  url: '/product/glbs/updatafenlei2',
			  headers: {'token': window.localStorage.getItem('token')},
			  data: this.fileData
			}).then(response => {
				console.log(response.data.code)
				if(response.data.code==200){
					this.notifySucceed(response.data.message);
					this.fenlei2s.name = this.fenlei2.name
					if(response.data.data.icon!=null){
						this.fenlei2s.icon = response.data.data.icon
					}
					this.$refs["ruleForm"].resetFields();
					this.fileList =[]
					this.iscreatefenlei2s = false
					
				}else {
					this.notifyError(response.data.message);
				}
				this.fileList = []
			}).catch((error) => {
			  console.log(error)
			  alert('连接失败')
			})	
		},
		uploadFile (file) {
			this.fileData.append('files', file.file)
		},
		exceed(files, fileList){
			this.$message.error('最多上传1张图片哦！')
		},
		beforeUpload(file,fileList) {
			const isLt2M = file.size /1024/1024 < 2;
			if (!isLt2M) {
				fileList.pop()
				this.$message.error('上传图片大小不能超过 2MB!');
				return false
			}
			this.fileList = fileList;
		 },
		handleRemove (file, fileList) {
			this.fileList = fileList;
			console.log(file.url)
		},
		handlePictureCardPreview (file) {
		 	this.dialogImageUrl = file.url
		 	this.dialogVisible = true
		},
	},

}
</script>

<style>
</style>