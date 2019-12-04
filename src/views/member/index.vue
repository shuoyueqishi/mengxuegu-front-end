<template>
   <div >
      <el-table
         :data="list"
         height="380"
         border
         style="width: 100%">
         <el-table-column
            type="index"
            label="序号"
            width="60">
         </el-table-column>
         <el-table-column
            prop="cardNumber"
            label="会员卡号">
         </el-table-column>
         <el-table-column
            prop="name"
            label="会员姓名">
         </el-table-column>
         <el-table-column
            prop="telephoneNumber"
            label="手机号码">
         </el-table-column>
         <el-table-column
            prop="birthday"
            label="会员生日">
         </el-table-column>
         <el-table-column
            prop="integral"
            label="可用积分">
         </el-table-column>
         <el-table-column
            prop="money"
            label="开卡金额">
         </el-table-column>
         <el-table-column
            prop="paymentType"
            label="支付类型">
         </el-table-column>
         <el-table-column
            prop="address"
            label="会员地址">
         </el-table-column>
         <el-table-column
            label="操作"
            width="150">
            <template slot-scope="scope">
               <el-button
               size="mini"
               @click="handleEdit(scope.row.id)">
               编辑
               </el-button>
               <el-button
               size="mini"
               type="danger"
               @click="handleDelete(scope.row.id)">
               删除
               </el-button>
            </template>
         </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
         style="width: 100%"
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="page.currentPage"
         :page-sizes="page.pageSizeOption"
         :page-size="page.pageSize"
         layout="total, sizes, prev, pager, next, jumper"
         :total="page.total">
    </el-pagination>
   </div>
</template>

<script>
import axios from '@/http.js'
import { member } from "@/config/url.json";
export default {
   data() {
      return {
         list:[],
         page:{
            currentPage: 1,
            pageSize: 10,
            total: 0,
            totalPages: 0,
            pageSizeOption: [10,20,50,100]
         }
      }
   },
   //钩子函数获取数据
    created() {
       this.fetchData();
    },
    methods: {
       fetchData() {
          console.log(member.search);
          axios({
            url: member.search+'/10/1',
            method:'get'
          }).then(response => {
            let data = response.data;
             console.log(data);
             this.list = data.result;
             this.page.currentPage = data.page.currentPage;
             this.page.pageSize = data.page.pageSize;
             this.page.total = data.page.total;
             this.page.totalPages = data.page.totalPages;
             console.log(this.page)
          })
       },
       handleEdit(id) {
          console.log("编辑");
       },
       handleDelete(id) {
          console.log('删除');
       },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}
</script>

<style scoped>
   div{
      text-align: center;
   }
</style>
