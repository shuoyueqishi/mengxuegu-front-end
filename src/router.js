import Vue from "vue";
import Router from "vue-router";
// import Login from './views/login/index.vue'
//  下面情况，默认的会导入 ./views/login 目录下的index.vue组件
import Login from './views/login/index.vue'
import Layout from '@/components/Layout.vue'
import Home from './views/home/index.vue'
import Member from './views/member/index.vue'
import Supplier from './views/supplier/index.vue'
import Goods from './views/goods/index.vue'
import Staff from './views/staff/index.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/',
      name: 'layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
          meta: {
            title: '首页'
          }
        },
        {
          path: '/member',
          component: Member,
          meta: {
            title: '会员管理'
          }
        },
        {
          path: '/supplier',
          component: Supplier,
          meta:{
            title: '供应商管理'
          }
        },
        {
          path: '/goods',
          component: Goods,
          meta:{
            title: '商品管理'
          }
        },
        {
          path: '/staff',
          component: Staff,
          meta:{
            title: '员工管理'
          }
        }
      ]
    }
  ]
});
