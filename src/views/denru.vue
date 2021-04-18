<template>
  <div id="denru"class="clearfix" >
    <div class="from">
		<h3><div class="biaotitext">二手买卖管理系统系统</div></h3>
		<el-form status-icon  style="text-align: center;" ref="ruleForm" :rules="rules" :model="denrus" class="demo-ruleForm">
			<el-form-item prop="username">
				<el-input style="width: 280px;" prefix-icon="el-icon-user-solid" placeholder="请输入账号" v-model="denrus.username"></el-input>
			</el-form-item>
		    <el-form-item prop="password">
		        <el-input style="width: 280px;" prefix-icon="el-icon-view" type="password" placeholder="请输入密码" v-model="denrus.password"></el-input>
		    </el-form-item>
		    <el-form-item>
				<el-button size="medium" type="primary" @click="denru()" style="width: 280px;">登录</el-button>
		    </el-form-item>
		</el-form>
	</div>
  </div>
</template>

<script>
import {request} from '../myaxios/request.js'
export default {
	data() {
		let namerule = (rule, value, callback) => {
		  if (!value) {
		    return callback(new Error("请输入用户名"));
		  }
		  const Rule = /^.{2,12}$/;
		  if (Rule.test(value)) {
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		  } else {
		    return callback(new Error("长度2-12之间,"));
		  }
		};
		let passrule = (rule, value, callback) => {
		  if (!value) {
		    return callback(new Error("请输入密码"));
		  }
		  const Rule = /^.{2,12}$/;
		  if (Rule.test(value)) {
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		  } else {
		    return callback(new Error("长度2-12之间,"));
		  }
		};
		
		return {
			denrus: {
				username: "",
				password: ""
			},
			rules: {
			  username: [{ validator: namerule , trigger: "blur" }],
			  password: [{ validator:passrule , trigger: "blur" }]
			}
		}
	},
	methods: {
		denru() {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					this.$store.dispatch('denru',{user:this.denrus})
				} else {
					return false;
				}
			});
			
		}
	}
}
	
</script>

<style>
#denru {
	background-image: url(../assets/e481ff3aee49bdc846c2bfe3907219b7.jpg);
	background-size: 100%;
	background-repeat: no-repeat;
	height: 100vh;
}
#denru .from {
	/* padding: 50px; */
	padding-top: 20px;
	width: 400px;
	height: 270px;
	margin: 0 auto;
	margin-top: 24vh ;
	background-color: rgba(240, 255, 255, 0.5);
}
#denru .biaotitext {
	margin-bottom: 30px;
	text-align: center;
 	color: transparent;
	background-color : black;
	text-shadow : rgba(255,255,255,0.5) 0 5px 6px, rgba(255,255,255,0.2) 1px 3px 3px;
	-webkit-background-clip : text;
}
</style>
