<template>
   <div >
      <!-- 查询条件 -->
      <el-form  ref="memberQueryForm" :model="memberQuery" :inline="true" style="top: 10px">
         <el-form-item label="卡号" prop="cardNumber" size="medium">
            <el-input v-model="memberQuery.cardNumber" placeholder="cardNumber"></el-input>
         </el-form-item>
         <el-form-item label="姓名" prop="name" size="medium">
            <el-input v-model="memberQuery.name" placeholder="name"></el-input>
         </el-form-item>
         <el-form-item label="电话号码" prop="telephoneNumber" size="medium">
            <el-input v-model="memberQuery.telephoneNumber" placeholder="telephoneNumber"></el-input>
         </el-form-item>
         <el-form-item label="支付方式" prop="paymentType" size="medium">
            <el-select v-model="memberQuery.paymentType" placeholder="paymentType">
               <el-option label="银行卡" value="1"></el-option>
               <el-option label="支付宝" value="2"></el-option>
               <el-option label="微信" value="3"></el-option>
               <el-option label="现金" value="4"></el-option>
               <el-option label="信用卡" value="5"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="fetchData" size="medium">查询</el-button>
            <el-button type="primary" @click="resetForm('memberQueryForm')" size="medium">重置</el-button>
            <el-button type="primary" @click="add('memberQueryForm')" size="medium">新增</el-button>
         </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
         :data="list"
         border
         style="width: 100%">
         <el-table-column type="index" label="序号" width="80"></el-table-column>
         <el-table-column prop="cardNumber" label="会员卡号" width=120></el-table-column>
         <el-table-column prop="name" label="会员姓名"  width="120"> </el-table-column>
         <el-table-column prop="telephoneNumber" label="手机号码"  width="130"></el-table-column>
         <el-table-column prop="birthday" label="会员生日" width="80"></el-table-column>
         <el-table-column prop="integral" label="可用积分" width="100"></el-table-column>
         <el-table-column prop="money" label="开卡金额" width="100"></el-table-column>
         <el-table-column prop="paymentType" label="支付类型" width="100"></el-table-column>
         <el-table-column prop="address" label="会员地址"></el-table-column>
         <el-table-column
            label="操作"
            width="150">
            <template slot-scope="scope">
               <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">
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

    <!-- 新增或更新会员 -->
    <el-dialog :title="addUpdateTitle" :visible.sync="dialogFormVisible" width="650px" @close="resetForm('addUpdateForm')">
         <el-form :model="addUpdateForm" :rules="rules" ref="addUpdateForm" label-width="90px" size="mini">
            <el-col :span="12">
               <el-form-item label="会员卡号" prop="cardNumber">
                  <el-input v-model="addUpdateForm.cardNumber"></el-input>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="会员姓名" prop="name">
                     <el-input v-model="addUpdateForm.name"></el-input>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="电话号码" prop="telephoneNumber">
                 <el-input v-model="addUpdateForm.telephoneNumber"></el-input>
               </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="会员生日" required>
                  <el-form-item prop="birthday">
                    <el-date-picker type="date" format="MM-dd" value-format="MM-dd" placeholder="选择日期" v-model="addUpdateForm.birthday" style="width: 100%;"></el-date-picker>
                  </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="可用积分" prop="integral">
                  <el-input v-model="addUpdateForm.integral"></el-input>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="剩余金额" prop="money">
                  <el-input v-model="addUpdateForm.money"></el-input>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="支付类型" prop="paymentType">
                  <el-select v-model="addUpdateForm.paymentType" placeholder="请选择支付的方式" style="width: 100%;">
                     <el-option label="银行卡" value="1"></el-option>
                     <el-option label="支付宝" value="2"></el-option>
                     <el-option label="微信" value="3"></el-option>
                     <el-option label="现金" value="4"></el-option>
                     <el-option label="信用卡" value="5"></el-option>
                  </el-select>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="常用地址" prop="address">
                  <el-input v-model="addUpdateForm.address"></el-input>
               </el-form-item>
            </el-col>
               <div class="addUpdateBtn">
                   <el-button type="primary" size="small" @click="addUpdateMember('addUpdateForm')">{{addUpdateOperation}}</el-button>
                   <el-button type="primary" size="small" @click="resetForm('addUpdateForm')">重置</el-button>
               </div>
         </el-form>
      </el-dialog>
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
         },
         memberQuery: {
           cardNumber: '',
           name: '',
           telephoneNumber: '',
           paymentType: ''
        },
        dialogFormVisible: false,
        addUpdateOperation: '',
        addUpdateTitle: '',
        addUpdateForm: {
          cardNumber: '',
          name: '',
          telephoneNumber: '',
          birthday: '',
          integral: 0,
          money: 0,
          paymentType: '',
          address: '',
          createBy: '',
          lastUpdateBy: ''
        },
        rules: {
          cardNumber: [
            { required: true, message: '请输入会员卡号', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          telephoneNumber: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在 11 个字符的数字', trigger: 'blur' }
          ],
          birthday: [
            { type: 'string', required: false, message: '请选择生日', trigger: 'blur' }
          ],
          paymentType: [
            { required: true, message: '请选择支付方式', trigger: 'blur' }
          ]
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
          let params={};
          this.memberQuery.cardNumber ? params.cardNumber = this.memberQuery.cardNumber: ''; 
          this.memberQuery.name ? params.name = this.memberQuery.name: ''; 
          this.memberQuery.telephoneNumber ? params.telephoneNumber = this.memberQuery.telephoneNumber: ''; 
          this.memberQuery.paymentType ? params.paymentType = this.memberQuery.paymentType: ''; 
          axios.get(member.search+'/'+this.page.pageSize+'/'+this.page.currentPage,{
               params
            }).then(response => {
            let data = response.data;
             console.log(data);
             
             this.list = data.result;
             for(let item of this.list) {
                switch(item.paymentType) {
                case 1: item.paymentType='银行卡'; break;
                case 2: item.paymentType='支付宝'; break;
                case 3: item.paymentType='微信'; break;
                case 4: item.paymentType='现金'; break;
                case 5: item.paymentType='信用卡'; break;
                default: break;
               }
             }
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
       addUpdateMember(formName) {
           console.log("addUpdateMember");
           let params={};
           this.addUpdateForm.id ? params.id = this.addUpdateForm.id: ''; 
           this.addUpdateForm.cardNumber ? params.cardNumber = this.addUpdateForm.cardNumber: ''; 
           this.addUpdateForm.name ? params.name = this.addUpdateForm.name: ''; 
           this.addUpdateForm.telephoneNumber ? params.telephoneNumber = this.addUpdateForm.telephoneNumber: ''; 
           this.addUpdateForm.birthday ? params.birthday = this.addUpdateForm.birthday: ''; 
           this.addUpdateForm.integral ? params.integral = this.addUpdateForm.integral: ''; 
           this.addUpdateForm.money ? params.money = this.addUpdateForm.money: ''; 
           this.addUpdateForm.paymentType ? params.paymentType = this.addUpdateForm.paymentType: ''; 
           this.addUpdateForm.address ? params.address = this.addUpdateForm.address: ''; 
           this.addUpdateForm.createBy ? params.createBy = this.addUpdateForm.createBy: ''; 
           this.addUpdateForm.lastUpdateBy ? params.lastUpdateBy = this.addUpdateForm.lastUpdateBy: ''; 
           if (this.validateForm(formName)) {
              if (this.addUpdateForm.id) {
                  axios.put(member.update,params)
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
              } else {
                  axios.post(member.add,params)
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
      add(fromName) {
           console.log("addUpdateMember");
           this.addUpdateOperation = '新增';
           this.addUpdateTitle = '新增会员信息';
           this.addUpdateForm = {};
           this.dialogFormVisible = true;
       },
       handleEdit(row) {
          console.log("编辑数据");
          this.addUpdateForm = row;
          console.log("this.addUpdateMember.telephoneNumber="+this.addUpdateForm.telephoneNumber);
          this.addUpdateForm.telephoneNumber = this.addUpdateForm.telephoneNumber+'';
          let paymentType =  this.addUpdateForm.paymentType;
          switch(paymentType) {
                case '银行卡': this.addUpdateForm.paymentType=1; break;
                case '支付宝': this.addUpdateForm.paymentType=2; break;
                case '微信': this.addUpdateForm.paymentType=3; break;
                case '现金': this.addUpdateForm.paymentType=4; break;
                case '信用卡': this.addUpdateForm.paymentType=5; break;
                default: break;
          };
          this.addUpdateForm.lastUpdateBy=window.localStorage.getItem('user');
          this.dialogFormVisible = true;
          this.addUpdateOperation = '修改';
          this.addUpdateTitle = '修改会员信息';
       },
       handleDelete(id) {
          console.log('删除');
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
           }).then(() => {
               axios({url: member.delete+'/'+id, method:'delete'}).then(response => {
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
   };
   .addUpdateBtn{
      text-align: center;
   }
</style>
