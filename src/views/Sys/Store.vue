<template>
    <div class="page-container">
        <el-row :gutter="20">
            <el-col :span="18" class="ta-l">
                <div class="grid-content">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" >
                        <el-form-item style="width:50%">
                            <el-input v-model="formInline.keyword" placeholder="请输入仓库编号/仓库名称" autocomplete="on"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-row  class="mgb20 ta-r">
                        <el-button type="primary" plain @click="addStore()"> <span class="fa fa-edit"></span> 增加仓库</el-button>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        


        
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
            type="index"
            label="编号"
            width="100"
            align="center"
            >
            </el-table-column>
        
            <el-table-column
            prop="no"
            label="仓库编号"
            width="200"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="name"
            label="仓库名称"
            width="200"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="contacts"
            label="负责人"
            width="200"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="tell"
            label="联系方式"
            width="200"
            align="center"
            >
            </el-table-column>

            <el-table-column
            prop="remark"
            label="备注"
            width="300"
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
        <StoreDialog 
        :title='Atitle' 
        :dialogVisible = 'ADialogVisible' 
        :dialogaRuleForm = 'ADialogaRuleForm'
        @closeDialog='closeDialog'
        >
        </StoreDialog>
        <!--修改弹窗 -->
        <StoreDialog 
        :title='Mtitle' 
        :dialogVisible = 'MDialogVisible' 
        :dialogaRuleForm = 'MDialogaRuleForm'
        @closeDialog='closeDialog'
        >
        </StoreDialog>

    </div>



</template>
<script>
    import StoreDialog from '@/components/StoreDialog'
    export default{
        components:{
            StoreDialog
        },
        data(){
            return{
                tableData:[
                    {
                        no:12525222,
                        name:'xxx',
                        contacts:'xxx',
                        tell:'xxx',
                        remark:'xxx'
                    }
                ],
                MDialogaRuleForm:
                    {
                        no:'12151',
                        name:'修改',
                        storehouse:'',
                        tell:'xxx',
                        address:'xxx',
                        remark:'xxx'
                    }
                ,
                ADialogaRuleForm:
                    {
                        no:'',
                        name:'',
                        storehouse:'',
                        tell:'',
                        address:'',
                        remark:''
                    }
                ,
                Atitle:'增加仓库',
                Mtitle:'修改仓库',
                ADialogVisible:false,
                MDialogVisible:false,
                formInline: {
                    keyword: ''
                }
            }
        },
        methods:{
            addStore(){
                this.ADialogVisible = true
            },
            closeDialog(){
                this.MDialogVisible = false
                this.ADialogVisible = false
            },
            modifyInfo(row){
                this.MDialogVisible = true
            },
            deleteInfo(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })     
                })
            },
            onSubmit(){
                console.log(123)
            }
        }
        
    }
</script>