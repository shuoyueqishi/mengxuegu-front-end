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
            <el-button type="primary" @click="addNewSupplier('supplierQueryForm')" size="medium">新增</el-button>
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
      <!-- 新增或修改 -->
      <el-dialog :title="addUpdateTitle" :visible.sync="dialogFormVisible" width="400px" @close="addUpdateClose('addUpdateForm')">
         <el-form :model="addUpdateForm" :rules="rules" ref="addUpdateForm" label-width="100px" size="mini">
            <el-form-item label="供应商编码" prop="code">
               <el-input v-model="addUpdateForm.code"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="name">
                  <el-input v-model="addUpdateForm.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contact">
               <el-input v-model="addUpdateForm.contact"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="telephone">
               <el-input v-model="addUpdateForm.telephone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
               <el-input v-model="addUpdateForm.email"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
               <el-input type="textarea" v-model="addUpdateForm.address"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
               <el-input type="textarea" v-model="addUpdateForm.remark"></el-input>
            </el-form-item>
            <div class="addUpdateBtn">
                  <el-button type="primary" size="small" @click="addUpdateSupplier('addUpdateForm')">{{addUpdateOperation}}</el-button>
                  <el-button size="small" @click="resetForm('addUpdateForm')">重置</el-button>
            </div>
         </el-form>
      </el-dialog>

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
         addUpdateTitle: '',
         dialogFormVisible: false,
         addUpdateOperation: '',
         addUpdateForm: {
            id: '',
            code: '',
            name: '',
            contact: '',
            telephone: '',
            email: '',
            address: '',
            remark: '',
            createBy: '',
            lastUpdateBy: ''
         },
         rules: {
          code: [
            { required: true, message: '请输入供应商编码', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入供应商名字', trigger: 'blur' },
             { min: 1, max: 80, message: '最大80个字符', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
             { min: 1, max: 40, message: '最大40个字符', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在 11 个字符的数字', trigger: 'blur' }
          ]
        }
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
          axios.get(supplier.search+'/'+this.page.pageSize+'/'+this.page.currentPage,{params}).then(response => {
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
       validateForm(formName) {
           let flag = true;
           console.log("validateForm="+formName);
           this.$refs[formName].validate((valid) => {
               if (valid) {
                  flag = true;
                  console.log('required field is not empty.');
               } else {
                  console.log('required field is empty.');
                  flag=false;
                  return false;
               }
            });
            return flag;
       },
      resetForm(formName) {
         console.log('formName='+formName);
          this.$refs[formName].resetFields();
       },
       addUpdateClose(forName) {
          this.resetForm(forName);
          this.dialogFormVisible=false;
          this.fetchData();
       },
       addNewSupplier(formName) {
          console.log('addNewSupplier');
          this.addUpdateTitle = '新增供应商';
          this.dialogFormVisible=true;
          this.addUpdateOperation = '新增';
          this.addUpdateForm.id = null;
       },
       handleEdit(id) {
          console.log('这是编辑按钮');
          let params={};
          params.id=id;
          axios.get(supplier.search+'/'+this.page.pageSize+'/'+this.page.currentPage,{
               params
            }).then(response => {
               let data = response.data;
               console.log(data);
               this.addUpdateForm=data.result[0];
               this.addUpdateForm.telephone=this.addUpdateForm.telephone+'';
               console.log("this.addUpdateForm======="+this.addUpdateForm);
            });
          this.addUpdateTitle = '更新供应商';
          this.addUpdateOperation = '更新';
          this.dialogFormVisible=true;
          this.addUpdateForm.id=id;
          
       },
       addUpdateSupplier(formName) {
           console.log("addUpdateSupplier");
           let params={};
           this.addUpdateForm.id ? params.id = this.addUpdateForm.id: ''; 
           this.addUpdateForm.code ? params.code = this.addUpdateForm.code: ''; 
           this.addUpdateForm.name ? params.name = this.addUpdateForm.name: ''; 
           this.addUpdateForm.contact ? params.contact = this.addUpdateForm.contact: ''; 
           this.addUpdateForm.telephone ? params.telephone = this.addUpdateForm.telephone: ''; 
           this.addUpdateForm.email ? params.email = this.addUpdateForm.email: ''; 
           this.addUpdateForm.remark ? params.remark = this.addUpdateForm.remark: ''; 
           this.addUpdateForm.address ? params.address = this.addUpdateForm.address: ''; 
           params.lastUpdateBy=window.localStorage.getItem('user');
           if (this.validateForm(formName)) {
              if (this.addUpdateForm.id) { //更新
                  axios.put(supplier.update,params)
                  .then(response => {
                     let data = response.data;
                     if (data.status === 'success') {
                        this.$message({type: 'success',message: data.message});
                        this.fetchData();
                     } else {
                        this.$message({type: 'fail',message: data.message});
                     }
                  }).catch(e => {
                     this.$message({type: 'error',message: e});
                  })
              } else { //新增
                  params.createBy=window.localStorage.getItem('user');
                  axios.post(supplier.add,params)
                  .then(response => {
                     let data = response.data;
                     if (data.status === 'success') {
                        this.$message({type: 'success',message: data.message});
                     } else {
                        this.$message({type: 'fail',message: data.message});
                     }
                  }).catch(e => {
                     this.$message({type: 'error',message: e});
                  })
              }   
            } else {
              this.$message({type: 'fail',message: '必填字段为空'});
           }
       },
       resetForm(formName) {
         console.log('formName='+formName);
          this.$refs[formName].resetFields();
       },
       handleDelete(id) {
           console.log('删除');
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
           }).then(() => {
               axios({url: supplier.delete+'/'+id, method:'delete'}).then(response => {
                  this.fetchData();
                  });
               this.$message({type: 'success',message: '删除成功!'});
           }).catch(() => {
               this.$message({
                  type: 'info',
                  message: '已取消删除'
                  });          
            });
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
   .addUpdateBtn{
      text-align: center;
   }
</style>
