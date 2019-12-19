<template>
   <div >
      <!-- 查询条件 -->
      <el-form  ref="supplierQueryForm" :model="supplierQueryForm" :inline="true" style="top: 10px">
         <el-form-item label="供应商编码" prop="code" size="medium">
            <el-input v-model="supplierQueryForm.code" placeholder="code"></el-input>
         </el-form-item>
         <el-form-item label="供应商名称" prop="name" size="medium">
            <el-input v-model="supplierQueryForm.name" placeholder="name"></el-input>
         </el-form-item>
         <el-form-item label="联系人" prop="contact" size="medium">
            <el-input v-model="supplierQueryForm.contact" placeholder="contact"></el-input>
         </el-form-item>
         <el-form-item label="电话号码" prop="telephone" size="medium">
            <el-input v-model="supplierQueryForm.telephone" placeholder="telephone"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="fetchData" size="medium">查询</el-button>
            <el-button @click="resetForm('supplierQueryForm')" size="medium">重置</el-button>
         </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
         :data="supplierList"
         border
         style="width: 100%">
         <el-table-column type="index" label="序号" width="80"></el-table-column>
         <el-table-column prop="code" label="供应商编码" width=120></el-table-column>
         <el-table-column prop="name" label="供应商名称"  width="120"> </el-table-column>
         <el-table-column prop="contact" label="联系人" width="100"></el-table-column>
         <el-table-column prop="telephone" label="手机号码"  width="130"></el-table-column>
         <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
         <el-table-column prop="address" label="地址" width="150"></el-table-column>
         <el-table-column prop="remark" label="备注" width="150"></el-table-column>
         <el-table-column prop="createBy" label="创建人" width="80"></el-table-column>
         <el-table-column prop="creationDate" label="创建日期" width="160"></el-table-column>
         <el-table-column prop="lastUpdateBy" label="更新人" width="80"></el-table-column>
         <el-table-column prop="lastUpdateDate" label="更新日期" width="160"></el-table-column>
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
import axios from '@/http.js';
import { supplier } from "@/config/url.json";
export default {
   data() {
      return {
        supplierQueryForm: {
           code: '',
           name: '',
           telephone: '',
           contact: ''
        },
        supplierList:[],
        page:{
            currentPage: 1,
            pageSize: 10,
            total: 0,
            totalPages: 0,
            pageSizeOption: [10,20,50,100]
         },
      }
       
   },
   created() {
       this.fetchData();
    },
   methods: {
      fetchData() {
          console.log(supplier.search);
          let params={};
          this.supplierQueryForm.code ? params.code = this.supplierQueryForm.code: ''; 
          this.supplierQueryForm.name ? params.name = this.supplierQueryForm.name: ''; 
          this.supplierQueryForm.telephone ? params.telephone = this.supplierQueryForm.telephone: ''; 
          this.supplierQueryForm.contact ? params.contact = this.supplierQueryForm.contact: ''; 
          axios.get(supplier.search+'/'+this.page.pageSize+'/'+this.page.currentPage,{
               params
            }).then(response => {
            let data = response.data;
             console.log(data);
             this.supplierList = data.result;
             this.page.currentPage = data.page.currentPage;
             this.page.pageSize = data.page.pageSize;
             this.page.total = data.page.total;
             this.page.totalPages = data.page.totalPages;
             console.log(this.page)
          })
       },
      resetForm(formName) {
         console.log('formName='+formName);
          this.$refs[formName].resetFields();
       },
       handleEdit(id) {

       },
       handleDelete(id) {

       },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page.currentPage = val;
        this.fetchData();
      }

   }
}


</script>

<style scoped>
   div{
      text-align: center;
   }
</style>
