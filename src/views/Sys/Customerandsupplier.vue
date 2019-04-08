<template>
    <div class="page-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="float:left;" >
            <el-form-item >
                <el-input v-model="formInline.keyword" placeholder="请输入查询的姓名" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>


        <el-row style="text-align:right;" class="mgb20">
            <el-button type="primary" plain @click="addCustomer()"> <span class="fa fa-edit"></span> 增加客户/供应商资料</el-button>
        </el-row>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
            type="index"
            label="编号"
            width="50"
            align="center"
            >
            </el-table-column>
        
            <el-table-column
            prop="no"
            label="客户/供应商编号"
            width="130"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="name"
            label="客户/供应商名称"
            width="130"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="type"
            label="类别"
            width="80"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="contacts"
            label="联系人"
            width="100"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="tell"
            label="电话"
            width="150"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="address"
            label="地址"
            width="200"
            align="center"
            >
            </el-table-column>


            <el-table-column
            prop="remark"
            label="备注"
            width="100"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="handle"
            label="操作"
            align="center"
            min-width="200"
            :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    
                    <el-button size="mini" @click="modifyInfo(scope.row)" icon="el-icon-delete">修改</el-button>
                    <el-button size="mini" @click="deleteInfo(scope.row)" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--增加弹窗 -->
        <CustomerSupplier 
        :title='Atitle' 
        :dialogVisible = 'ADialogVisible' 
        :dialogaRuleForm = 'ADialogaRuleForm'
        @closeDialog='closeDialog'
        >
        </CustomerSupplier>
        <!--修改弹窗 -->
        <CustomerSupplier 
        :title='Mtitle' 
        :dialogVisible = 'MDialogVisible' 
        :dialogaRuleForm = 'MDialogaRuleForm'
        @closeDialog='closeDialog'
        >
        </CustomerSupplier>

    </div>



</template>
<script>
    import CustomerSupplier from '@/components/CustomerSupplierDialog'
    export default{
        components:{
            CustomerSupplier
        },
        data(){
            return{
                tableData:[
                    {
                    no:12525222,
                    name:'xxx',
                    type:'xxx',
                    contacts:'xxx',
                    tell:'xxx',
                    address:'xxx',
                    remark:'xxx'
                    }
                ],
                MDialogaRuleForm:
                    {
                        
                        name:'修改',
                        type:'客户',
                        contacts:'xxx',
                        tell:'xxx',
                        address:'xxx',
                        remark:'xxx'
                    }
                ,
                ADialogaRuleForm:
                    {
                        name:'',
                        type:'',
                        contacts:'',
                        tell:'',
                        address:'',
                        remark:''
                    }
                ,
                Atitle:'增加客户/供应商资料',
                Mtitle:'修改客户/供应商资料',
                ADialogVisible:false,
                MDialogVisible:false,
                formInline: {
                    keyword: ''
                }
            }
        },
        methods:{
            addCustomer(){
                this.ADialogVisible = true
            },
            closeDialog(){
                this.MDialogVisible = false
                this.ADialogVisible = false
            },
            modifyInfo(row){
                this.MDialogVisible = true
            },
            deleteInfo(row){},
            onSubmit(){
                console.log(123)
            }
        }
        
    }
</script>