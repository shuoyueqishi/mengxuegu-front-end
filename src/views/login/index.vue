<template>
  <div class="login-container">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
          <h2 class="login-title">梦学谷会员管理系统</h2>
          <el-form-item label="帐号" prop="username">
              <el-input v-model="form.username"  placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('form')" @keyup.enter="submitForm('form')">登录</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
// import {login} from '@/api/login'
import axios from '@/http.js'
import { login } from "@/config/url.json";
import * as types from '@/store/types'
  export default {
    data() {
      return {
        form: {
            username: '',
            password: ''
         },
         rules: {
             username: [
                  {required: true, message: '帐号不能为空', trigger: 'blur' },
             ],
             password: [
                 {required: true, message: '密码不能为空', trigger: 'blur' },
             ]
         }
      }
    },
    created(){
    var _self = this;
    document.onkeydown = function(e){
        var key = window.event.keyCode;
        if(key == 13){
            _self.submitForm('form');
        }
      }
    },
     mounted(){
      this.$store.commit(types.TITLE, 'Login');
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
            console.log(valid)
            if (valid) {
                // 提交表单给后台进行验证是否正确
                //login(this.form.username, this.form.password)
                let params={
                    username: this.form.username,
                    password: this.form.password
                    };
                axios.get(login,{
                    params
                }).then(response => {
                    const resp = response.data 
                    console.log(resp)
                    if(resp.status==='SUCCESS') {
                         // 1. 保存 token ，用户信息
                         this.$store.commit(types.USRE, resp.result[0].name)
                         this.$store.commit(types.LOGIN, resp.result[0].token)
                         console.log("this.$router.push('/')");
                         this.$router.push('/')
                    }else {
                        // 未通过，弹出警告
                        // alert(resp.message)
                        this.$message({
                            message: resp.message,
                            type: 'warning'
                        });
                    }
                })
            }else{
                console.log('验证失败')
                return false
            }
        })
    },
  }
}
</script>


<style scoped>
.login-form {
    width: 350px;
    /* 上下间隙 160px, 左右自动居中 */
    margin: 160px auto;
    background-color: rgb(255,255,255,0.8);
    padding: 28px;
    border-radius: 20px;
}
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/login.jpg')
}
.login-title {
    color: #303133;
    text-align: center;
}
</style>