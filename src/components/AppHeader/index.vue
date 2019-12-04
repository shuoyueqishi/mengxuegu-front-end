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
import * as types from '@/store/types'
import store from '@/store/store'
export default {
     methods: {
      handleCommand(command) {
        switch(command) {
            case 'modifyPassword':
                console.log('modifyPassword');
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