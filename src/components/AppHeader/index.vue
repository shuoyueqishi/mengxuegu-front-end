<template>
    <div class="header">
        <a href='#/'>
            <img class="logo" src="@/assets/logo.png" width="25px" />
            <span class="company">梦学谷管理系统</span>
        </a>
       <el-dropdown  @command="handleCommand">
           <span calss="el-dropdown-link">
            {{user}}<i class="el-icon-arrow-down el-icon--right"/> 
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="modifyPassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- 修改密码 -->
       <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px" @close="addUpdateClose('ruleForm')">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名">
                     {{user}}
                </el-form-item>
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input type="password" v-model="ruleForm.oldPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input type="password" v-model="ruleForm.newPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checkNewPwd">
                    <el-input type="password" v-model="ruleForm.checkNewPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="passwordModifyConfirm('ruleForm')">确认</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
       </el-dialog>
    </div>
</template>

<script>
import * as types from '@/store/types';
import store from '@/store/store';
import {user} from '@/config/url.json';
import axios from '@/http.js';
export default {
      data() {
      const validateOldPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'));
        } else {
            callback();
        }
      };
      const validateNewPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkNewPwd !== '') {
            this.$refs.ruleForm.validateField('checkNewPwd');
          }
          callback();
        }
      };
      const validateCheckNewPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        user: store.state.user,  
        dialogFormVisible: false,
        ruleForm: {
          oldPwd: '',
          newPwd: '',
          checkNewPwd: ''
        },
        rules: {
          oldPwd: [
            { validator: validateOldPwd, trigger: 'blur' }
          ],
          newPwd: [
            { validator: validateNewPwd, trigger: 'blur' }
          ],
          checkNewPwd: [
            { validator: validateCheckNewPwd, trigger: 'blur' }
          ]
        }
      };
    },
     methods: {
      handleCommand(command) {
        switch(command) {
            case 'modifyPassword':
                console.log('modifyPassword');
                this.handlePwd();
                break;
            case 'logout':
                console.log('in logout');
                if (store.state.token != null) {
                   store.commit(types.LOGOUT);
                }
                if (store.state.user != null) {
                   store.commit(types.USER);
                }
                this.$router.push('/login');
                break;
            default: break;
        }
      },
      handlePwd(){
        this.dialogFormVisible=true;
        this.$nextTick(()=>{
            this.$refs['ruleForm'].resetFields();
        });
      },
      passwordModifyConfirm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.oldPwd===this.ruleForm.newPwd) {
              this.$message({type: 'warning',message: '新密码不能与原密码相同'});
            }
            else {
              let params={
                    number: store.state.user,
                    password: this.ruleForm.oldPwd
                    };
              axios.get(user.check,{params})
              .then(response => {
                let res = response.data;
                console.log("check user password response:"+res);
                if(res.status==='SUCCESS') {
                  let updateParams = {
                    number: store.state.user,
                    password: this.ruleForm.newPwd
                  };
                  axios.put(user.updatePassword,updateParams)
                  .then(updateResponse => {
                     let updateRes = updateResponse.data;
                     console.log("update password respons:"+updateRes);
                     if (updateRes.status === 'SUCCESS') {
                       this.$message({type: 'success',message: updateRes.message});
                       this.resetForm('ruleForm');
                       this.dialogFormVisible = false;
                       this.$router.push('/login');
                     } else {
                       this.$message({type: 'fail',message: updateRes.message});
                     }
                  });
                } else {
                  this.$message({type: 'fail',message: res.message});
                }
              });
            }   
          } else {
            console.log('Error when submit new password');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
.logo{
vertical-align: middle;
/* 上右下左 */
padding: 0px 10px 0px 40px;
}
.company {
    position: absolute;
    color: wheat;
}
.el-dropdown {
vertical-align: top;
color: wheat;
}
.el-icon-arrow-down {
font-size: 12px;
}
.el-dropdown {
    float: right;
    margin-right: 40px;
}
.el-dropdown-link{
    cursor: pointer;
    color: #ffffff;
}
</style>