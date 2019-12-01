<template>
    <div class="header">
        <a href='#/'>
            <img class="logo" src="@/assets/logo.png" width="25px" />
            <span class="company">梦学谷管理系统</span>
        </a>
       <el-dropdown  @command="handleCommand">
           <span calss="el-dropdown-link">
            admin<i class="el-icon-arrow-down el-icon--right"/> 
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="modifyPassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import {logout} from '@/api/login.js'
export default {
     methods: {
      handleCommand(command) {
        switch(command) {
            case 'modifyPassword':
                break;
            case 'logout':
                console.log('in console......>>>>>>');
                logout(localStorage.getItem(localStorage.getItem('mxg-msm-token'))).then(Response=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    this.$router.push('/login')
                });
                break;
            default: break;
        }
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